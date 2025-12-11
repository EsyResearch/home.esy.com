#!/usr/bin/env python3
"""
Script to update prompts in page.tsx with shortDescription and variables fields
from the extracted JSON data - Version 2 with better indentation handling.
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

def get_field_indent(lines, description_line_idx):
    """Get the indentation of the description field."""
    description_line = lines[description_line_idx]
    match = re.match(r'^(\s*)description:', description_line)
    if match:
        return match.group(1)
    return '      '  # Default indentation

def update_prompts_in_tsx(tsx_path, prompts_data, output_path=None):
    """Update the page.tsx file with shortDescription and variables fields."""
    
    with open(tsx_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = content.split('\n')
    updated_lines = []
    i = 0
    
    while i < len(lines):
        line = lines[i]
        updated_lines.append(line)
        
        # Check if this line contains an id field for prompts 17-68
        id_match = re.match(r'^(\s*)id:\s*(\d+),?\s*$', line)
        if id_match:
            prompt_id = int(id_match.group(2))
            
            if prompt_id >= 17 and prompt_id <= 68 and prompt_id in prompts_data:
                # Look for the description field in the next few lines
                j = i + 1
                description_found = False
                
                while j < len(lines) and j < i + 10:  # Look ahead up to 10 lines
                    if 'description:' in lines[j]:
                        description_found = True
                        description_line_idx = j
                        
                        # Check if shortDescription already exists
                        shortDescription_exists = False
                        for k in range(j + 1, min(j + 5, len(lines))):
                            if 'shortDescription:' in lines[k]:
                                shortDescription_exists = True
                                break
                        
                        if not shortDescription_exists:
                            # Add lines up to and including the description line
                            for k in range(i + 1, j + 1):
                                updated_lines.append(lines[k])
                            
                            # Get the proper indentation from the description field
                            field_indent = get_field_indent(lines, description_line_idx)
                            
                            # Add shortDescription and variables
                            prompt_info = prompts_data[prompt_id]
                            updated_lines.append(f"{field_indent}shortDescription: '{prompt_info['shortDescription']}',")
                            
                            # Format variables array
                            variables_str = ', '.join([f"'{var}'" for var in prompt_info['variables']])
                            updated_lines.append(f"{field_indent}variables: [{variables_str}],")
                            
                            # Skip the lines we already added
                            i = j
                            break
                    j += 1
        
        i += 1
    
    # Write the updated content
    if output_path:
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(updated_lines))
    else:
        return '\n'.join(updated_lines)

def verify_update(output_path, prompt_ids_to_check=[17, 25, 40, 68]):
    """Verify that the updates were applied correctly."""
    print("\nVerifying updates...")
    with open(output_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for prompt_id in prompt_ids_to_check:
        # Check if the prompt has shortDescription and variables
        pattern = rf'id:\s*{prompt_id},.*?shortDescription:.*?variables:\s*\[[^\]]+\]'
        if re.search(pattern, content, re.DOTALL):
            print(f"✓ Prompt {prompt_id} - Updated successfully")
        else:
            print(f"✗ Prompt {prompt_id} - Update may have failed")

def main():
    # File paths
    json_path = Path('/Users/lem/Desktop/Dev/apps/esy/client/esy.com/raw_templates/prompts_16_to_68_extracted.json')
    tsx_path = Path('/Users/lem/Desktop/Dev/apps/esy/client/esy.com/src/app/prompt-library/page.tsx')
    output_path = Path('/Users/lem/Desktop/Dev/apps/esy/client/esy.com/raw_templates/page_updated_v2.tsx')
    
    print("Loading extracted prompt data...")
    prompts_data = load_extracted_data(json_path)
    print(f"Loaded data for {len(prompts_data)} prompts")
    
    print("\nUpdating page.tsx...")
    updated_content = update_prompts_in_tsx(tsx_path, prompts_data)
    
    # Save to a new file first for review
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    print(f"\nUpdated content saved to: {output_path}")
    
    # Verify the updates
    verify_update(output_path)
    
    print("\nTo apply the changes, review the updated file and then copy it over the original:")
    print(f"  cp {output_path} {tsx_path}")
    
    # Count how many prompts were updated
    updated_count = 0
    for pid in range(17, 69):
        if pid in prompts_data:
            updated_count += 1
    
    print(f"\nTotal prompts to update: {updated_count}")

if __name__ == "__main__":
    main()