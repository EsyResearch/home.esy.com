#!/usr/bin/env python3

import re

# List of all missing variables by ID (from our analysis)
missing_variables = {
    16: ['DATA_TYPE', 'ANALYTICAL_APPROACH'],
    17: ['RESEARCH_HYPOTHESIS', 'DATA_TYPE'],
    18: ['RESEARCH_PROBLEM', 'INTEGRATION_STRATEGY'],
    19: ['RESEARCH_CONTEXT', 'PARTICIPANT_TYPE'],
    20: ['REVIEW_QUESTION', 'INCLUSION_CRITERIA'],
    21: ['FUNDING_AGENCY', 'RESEARCH_PROJECT'],
    22: ['BROAD_TOPIC', 'RESEARCH_CONTEXT'],
    23: ['DATA_TYPE', 'AUDIENCE'],
    24: ['MANUSCRIPT_TYPE', 'REVIEW_FOCUS'],
    25: ['RESEARCH_AREA', 'IMPACT_TYPE'],
    26: ['PRIMARY_DISCIPLINE', 'SECONDARY_DISCIPLINE'],
    27: ['REPLICATION_TYPE', 'ORIGINAL_STUDY'],
    28: ['LITERARY_WORK', 'AUTHOR'],
    29: ['CHARACTER_NAME', 'PSYCHOLOGICAL_THEORY'],
    30: ['WORK_ONE', 'WORK_TWO'],
    31: ['SYMBOLIC_ELEMENT', 'LITERARY_WORK'],
    32: ['LITERARY_WORK', 'GENRE'],
    33: ['FEMINIST_APPROACH', 'LITERARY_WORK'],
    34: ['LITERARY_WORK', 'COLONIAL_CONTEXT'],
    35: ['PSYCHOANALYTIC_CONCEPT', 'LITERARY_WORK'],
    36: ['LITERARY_WORK', 'CLASS_FOCUS'],
    37: ['READER_COMMUNITY', 'LITERARY_WORK'],
    38: ['TOPIC', 'TARGET_AUDIENCE'],
    39: ['SUBJECT', 'ANALYTICAL_APPROACH'],
    40: ['SUBJECT_A', 'SUBJECT_B'],
    41: ['APPLICATION_TYPE', 'CORE_EXPERIENCE'],
    42: ['TOPIC', 'COMPLEXITY_LEVEL'],
    43: ['POSITION', 'PERSUASION_GOAL'],
    44: ['SUBJECT', 'EVALUATION_CRITERIA'],
    45: ['EXPERIENCE_TYPE', 'LESSON_LEARNED'],
    46: ['PHENOMENON', 'ANALYSIS_FOCUS'],
    47: ['CONCEPT', 'DEFINITIONAL_APPROACH'],
    48: ['PROCESS', 'READER_LEVEL'],
    49: ['TOPIC', 'SOURCE_TYPES'],
    50: ['RESEARCH_QUESTION', 'METHODOLOGY'],
    51: ['EXPERIENCE', 'REFLECTION_FOCUS'],
    52: ['BUSINESS_CONTEXT', 'STAKEHOLDER_TYPE'],
    53: ['TECHNICAL_SUBJECT', 'USER_TYPE'],
    54: ['FUNDING_AGENCY', 'PROJECT_TYPE'],
    55: ['POLICY_ISSUE', 'RECOMMENDATION'],
    56: ['BUSINESS_PROBLEM', 'ANALYSIS_TYPE'],
    57: ['PROPOSAL_TYPE', 'CLIENT_NEED'],
    58: ['EMAIL_PURPOSE', 'RECIPIENT_LEVEL'],
    59: ['CRISIS_TYPE', 'STAKEHOLDER_GROUP'],
    60: ['SUBJECT', 'TARGET_READER'],
    61: ['CHAPTER_TOPIC', 'BOOK_THEME'],
    62: ['NICHE_TOPIC', 'PLATFORM_FOCUS'],
    63: ['BOOK_TYPE', 'PUBLISHING_GOAL'],
    64: ['EXPERTISE_AREA', 'LEARNING_FORMAT'],
    65: ['LIFE_THEME', 'TARGET_MESSAGE'],
    66: ['RESEARCH_FIELD', 'PUBLICATION_TYPE'],
    67: ['BUSINESS_FOCUS', 'AUTHORITY_GOAL'],
    68: ['CONTENT_TYPE', 'FORMAT_PRIORITY']
}

# Generate the variables property for each prompt
print("Variables to add for each prompt ID:\n")
for id, vars in missing_variables.items():
    vars_str = str(vars).replace("'", '"')
    print(f"ID {id}: variables: {vars_str},")
    
print(f"\nTotal prompts needing fix: {len(missing_variables)}")

# Read template to get shortDescriptions
template_path = '/Users/lem/Desktop/Dev/apps/esy/client/esy.com/raw_templates/new-prompt-library-ai-reference.txt'
with open(template_path, 'r') as f:
    template_content = f.read()

print("\n\nShort descriptions from template:\n")
for id in range(16, 69):
    # Find the prompt block in template
    pattern = rf'id: {id},.*?shortDescription: [\'"]([^\'"]+)[\'"]'
    match = re.search(pattern, template_content, re.DOTALL)
    if match:
        print(f"ID {id}: shortDescription: '{match.group(1)}',")