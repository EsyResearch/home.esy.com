#!/usr/bin/env python3
"""
Script to generate edit commands for updating prompts in page.tsx with 
shortDescription and variables fields from the extracted JSON data.
"""

import json
import re
from pathlib import Path

def load_extracted_data(json_path):
    """Load the extracted prompt data from JSON file."""
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Create a dictionary for easy lookup by ID
    prompts_dict = {prompt['id']: prompt for prompt in data['prompts']}
    return prompts_dict

def find_prompt_locations(tsx_path, prompts_data):
    """Find the locations of prompts that need updating."""
    with open(tsx_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = content.split('\n')
    updates_needed = []
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # Check if this line contains an id field for prompts 17-68
        id_match = re.match(r'^(\s*)id:\s*(\d+),?\s*$', line)
        if id_match:
            prompt_id = int(id_match.group(2))
            
            if prompt_id >= 17 and prompt_id <= 68 and prompt_id in prompts_data:
                # Look for the description field
                j = i + 1
                while j < len(lines) and j < i + 10:
                    if 'description:' in lines[j]:
                        # Check if shortDescription already exists
                        shortDescription_exists = False
                        for k in range(j + 1, min(j + 5, len(lines))):
                            if 'shortDescription:' in lines[k]:
                                shortDescription_exists = True
                                break
                        
                        if not shortDescription_exists:
                            updates_needed.append({
                                'id': prompt_id,
                                'description_line': j,
                                'description_content': lines[j].strip(),
                                'data': prompts_data[prompt_id]
                            })
                        break
                    j += 1
        i += 1
    
    return updates_needed

def generate_edit_commands(tsx_path, updates_needed, output_file):
    """Generate shell commands to edit the file."""
    
    with open(output_file, 'w') as f:
        f.write("#!/bin/bash\n")
        f.write("# Edit commands to update prompts in page.tsx\n\n")
        f.write(f"FILE='{tsx_path}'\n")
        f.write("cp $FILE $FILE.backup\n\n")
        
        # Sort updates by line number in reverse order to avoid line number shifts
        updates_needed.sort(key=lambda x: x['description_line'], reverse=True)
        
        for update in updates_needed:
            prompt_id = update['id']
            line_num = update['description_line'] + 1  # sed uses 1-based indexing
            data = update['data']
            
            # Escape single quotes in the data
            short_desc = data['shortDescription'].replace("'", "'\\''")
            variables = ', '.join([f"'{var}'" for var in data['variables']])
            
            # Generate sed commands to insert after the description line
            f.write(f"# Update prompt {prompt_id}\n")
            f.write(f"sed -i '' '{line_num}a\\\n")
            f.write(f"      variables: [{variables}],\n")
            f.write(f"' $FILE\n")
            
            f.write(f"sed -i '' '{line_num}a\\\n")
            f.write(f"      shortDescription: \\'{short_desc}\\',\n")
            f.write(f"' $FILE\n\n")
        
        f.write("echo 'All prompts updated successfully!'\n")

def main():
    # File paths
    json_path = Path('/Users/lem/Desktop/Dev/apps/esy/client/esy.com/raw_templates/prompts_16_to_68_extracted.json')
    tsx_path = Path('/Users/lem/Desktop/Dev/apps/esy/client/esy.com/src/app/prompt-library/page.tsx')
    output_script = Path('/Users/lem/Desktop/Dev/apps/esy/client/esy.com/raw_templates/apply_updates.sh')
    
    print("Loading extracted prompt data...")
    prompts_data = load_extracted_data(json_path)
    print(f"Loaded data for {len(prompts_data)} prompts")
    
    print("\nFinding prompts that need updates...")
    updates_needed = find_prompt_locations(tsx_path, prompts_data)
    print(f"Found {len(updates_needed)} prompts that need updating")
    
    if updates_needed:
        print("\nGenerating edit commands...")
        generate_edit_commands(tsx_path, updates_needed, output_script)
        print(f"\nEdit script saved to: {output_script}")
        print("To apply the updates, run:")
        print(f"  chmod +x {output_script}")
        print(f"  {output_script}")
        
        # Print summary
        print("\nPrompts to be updated:")
        for update in sorted(updates_needed, key=lambda x: x['id']):
            print(f"  - Prompt {update['id']}: {update['data']['shortDescription'][:50]}...")
    else:
        print("No updates needed - all prompts already have shortDescription and variables fields")

if __name__ == "__main__":
    main()