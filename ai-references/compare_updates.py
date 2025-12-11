#!/usr/bin/env python3
"""
Script to compare the original and updated files to show exactly what changed.
"""

import difflib
from pathlib import Path

def show_changes_summary():
    """Show a summary of all changes made."""
    original_file = Path('/Users/lem/Desktop/Dev/apps/esy/client/esy.com/src/app/prompt-library/page.tsx')
    updated_file = Path('/Users/lem/Desktop/Dev/apps/esy/client/esy.com/raw_templates/page_updated_v2.tsx')
    
    with open(original_file, 'r') as f:
        original_lines = f.readlines()
    
    with open(updated_file, 'r') as f:
        updated_lines = f.readlines()
    
    # Generate unified diff
    diff = difflib.unified_diff(
        original_lines,
        updated_lines,
        fromfile='page.tsx (original)',
        tofile='page.tsx (updated)',
        lineterm=''
    )
    
    # Count changes
    additions = 0
    current_prompt = None
    changed_prompts = []
    
    for line in diff:
        if line.startswith('+') and not line.startswith('+++'):
            if 'shortDescription:' in line or 'variables:' in line:
                additions += 1
        if 'id:' in line and any(str(i) in line for i in range(17, 69)):
            # Extract prompt ID
            import re
            match = re.search(r'id:\s*(\d+)', line)
            if match:
                current_prompt = int(match.group(1))
                if current_prompt not in changed_prompts:
                    changed_prompts.append(current_prompt)
    
    print(f"Total lines added: {additions}")
    print(f"Total prompts updated: {len(changed_prompts)}")
    print(f"Prompt IDs updated: {sorted(changed_prompts)}")
    
    # Show a sample of changes
    print("\nSample of changes (first 5 prompts):")
    print("-" * 60)
    
    # Reset to show actual diff samples
    diff = difflib.unified_diff(
        original_lines,
        updated_lines,
        fromfile='page.tsx (original)',
        tofile='page.tsx (updated)',
        lineterm='',
        n=3  # Context lines
    )
    
    prompt_count = 0
    show_lines = False
    for line in diff:
        if 'id: 17,' in line or 'id: 18,' in line or 'id: 19,' in line or 'id: 20,' in line or 'id: 21,' in line:
            show_lines = True
            prompt_count += 1
        
        if show_lines and prompt_count <= 5:
            if line.startswith('@@'):
                print("\n" + line)
            elif line.startswith('+') or line.startswith('-'):
                print(line)
            else:
                print(' ' + line.rstrip())
            
            if 'prompt:' in line:
                show_lines = False

if __name__ == "__main__":
    show_changes_summary()