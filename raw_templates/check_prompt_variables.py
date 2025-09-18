#!/usr/bin/env python3

import re

# Read the file
with open('/Users/lem/Desktop/Dev/apps/esy/client/esy.com/src/app/prompt-library/page.tsx', 'r') as f:
    content = f.read()

# Find all prompts
prompts_pattern = r'{[^}]*?id:\s*(\d+)[^}]*?prompt:\s*`([^`]+)`[^}]*?}'
prompts = re.findall(prompts_pattern, content, re.DOTALL)

print(f"Found {len(prompts)} prompts\n")

# Check each prompt
missing_variables = []
for prompt_id, prompt_text in prompts:
    # Extract placeholders from prompt text
    placeholders = re.findall(r'\[([A-Z_]+)\]', prompt_text)
    
    if placeholders:
        # Look for variables definition for this prompt
        prompt_block_pattern = rf'{{[^}}]*?id:\s*{prompt_id}[^}}]*?}}'
        prompt_block_match = re.search(prompt_block_pattern, content, re.DOTALL)
        
        if prompt_block_match:
            prompt_block = prompt_block_match.group()
            has_variables = 'variables:' in prompt_block
            
            if not has_variables:
                missing_variables.append({
                    'id': prompt_id,
                    'placeholders': placeholders,
                    'unique_placeholders': list(set(placeholders))
                })

print(f"Prompts missing variable definitions: {len(missing_variables)}\n")

for item in missing_variables:
    print(f"ID: {item['id']}")
    print(f"Missing variables: {', '.join(item['unique_placeholders'])}")
    print()