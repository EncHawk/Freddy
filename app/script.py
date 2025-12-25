import os
import sys
from huggingface_hub import InferenceClient
from pydantic import BaseModel, Field
from typing import List, Literal
import json as json
from dotenv import load_dotenv

load_dotenv()


TOKEN = os.getenv('Hf_token')
# 2. Choose a model endpoint (You can find these on HF Model Hub)
# Let's use a popular text generation model
client  = InferenceClient(token=TOKEN)

mistral_model = "mistralai/Mistral-7B-Instruct-v0.2"
summary_model ="meta-llama/Llama-3.2-1B-Instruct"

class issue_interface(BaseModel):
    url:str
    REPO:str
    TITLE:str
    ISSUE:str
class repo_identifier(BaseModel):
    REPOS:List[issue_interface]

def smart_format_input(input):
    output_schema = repo_identifier.model_json_schema()
    output_final = json.dumps(output_schema)
    
    # Count issues in input to ensure all are processed
    issue_count = input.count('https://github.com/')
    
    systemMessage=f"""
        CRITICAL: You MUST process ALL {issue_count} issues provided in the input. Do NOT skip any issues.
        
        Assume your role as an intermediary to the backend and the validation team. The backend team is sending multiple GitHub issues,
        and their titles, author names, and issue numbers. Your task is to reduce the effort for the validation team to read the body of each issue.
        
        Input format for EACH issue:
        {{
            "url": 'https://github.com/${{issue.author}}/${{issue.repo}}/issues/${{issue.issue_number}}' (retain this, send this url constructed based on the input for each of the repos)
            "REPO": name of the repository in the url (issue.repo)
            "TITLE": title of the repository, not part of the url, contains the title of the repo.
            "ISSUE": This contains the body of the issue, or rather the contents of it. This is where you come in
        }}

        
        STRICT RULES:
        1. YOU MUST PROCESS EVERY SINGLE ISSUE PROVIDED - IF THERE ARE {issue_count} ISSUES, YOU MUST OUTPUT {issue_count} ISSUES IN THE RESPONSE
        2. COUNT THE ISSUES IN THE INPUT AND VERIFY YOU PROCESSED ALL OF THEM
        3. DO NOT SKIP ANY ISSUES - PROCESS THEM IN THE ORDER THEY APPEAR
        4. DO NOT CHANGE THE TITLE OR CONTENT WHATSOEVER EXCEPT THE ISSUE BODY. 
        5. THE OUTPUT MUST ALWAYS FOLLOW THE OUTPUT SCHEMA THAT IS PROVIDED.
        6. THE CHARECTER LIMIT FOR EACH OF THE ISSUE'S CONCLUSION IS STRICTLY 400.
        
        Instructions:
        - In the issue part where the body of the issue is concentrated, make cuts removing redundant information
        - Add context by paying attention to files named, priority if mentioned, and maybe the tech stack from what you gather (leave out if insufficient information)
        - Make sure the output is strictly following this schema and includes ALL issues:
        - Author in the output is meant for strictly the name of the organisation. 
        
    """+output_final
    
    sendBack = client.chat_completion(model=summary_model,messages=[
        {"role":"system","content":systemMessage},
        {"role":"user","content" : input}
    ], max_tokens=3000)  # Increased from 1000 to handle multiple issues
    return sendBack.choices[0].message.content

def callApi (data):
    # print('reached LLM caller')
    if not data or not data.strip():
        sys.stderr.write('Error: Empty input data provided to API call!')
        sys.exit(1)
    
    transformedData= smart_format_input(input=data)
    if not transformedData or not transformedData.strip():
        sys.stderr.write('Error: Transformed data is empty after smart_format_input!')
        sys.exit(1)
    
    try:
        # Count issues in transformed data to ensure all are processed
        issue_count_in_transformed = transformedData.count('https://github.com/')
        
        response = client.chat_completion (
            model=mistral_model,
            messages=[{"role":"system", "content":f"""Assume the role of an AI backend component assisting open-source contributors.
                        Analyze the provided GitHub issue data, there might be multiple issues separate each of them using a -- block for ease of reading.
                        which is gonna be in this format (only an example, assume the same input format always):
                        https://github.com/asyncapi/website/issues/4758 
                        REPO: website
                        TITLE: [BUG] Remove deprecated AddThis script
                        ISSUE: The blog layout is loading an `AddThis` social sharing script that no longer exists. AddThis was terminated by Oracle on May 31, 2023, and the server 
                       `s7.addthis.com` is completely unreachable. Server is dead: ```$ curl -sI " `Exit code 6: Couldn't resolve host` Every blog page attempts to load a dead external script Browser console shows network errors `ERR_NAME_NOT_RESOLVED` 
                        Suggested Fix Remove the`AddThis <script>` tag from `BlogLayout.tsx` Remove the AddThis-related CSS hack styles in the same file Remove the .atss class from `globals.css` Yes! I am willing to raise a pr 
                        
                        --your task is to analyse the contents of this, retain the url in this process and return a valid url that is the same as provided.
                        --suggest a solution that closely aligns with the suggested fix column if provided. Do not come up with fancy assumptions, 
                        stick to the context of the issue contents nothing more,nothing less.
                        and respond STRICTLY in this format for EVERY issue:
                        author: [author name]
                        repo: [repo name]
                        url: https://github.com/[author name]/[repo name]/[issue number] // must be the same as the input url
                        title: [exact title from data]
                        ai_solution: [A detailed, technical baseline solution (300-500 words). 
                                    Break down the steps, suggest specific files/folders to look at if provided, 
                                    and explain the logic of the fix. be intuitive more than an actual full fledge solution]

                        Do not add conversational filler like 'Here is the analysis', or any special charecters, 
                        avoid punctuation by using capital letters, use whitespace judiciously. 
                        If multiple issues are provided, separate them with a horizontal line (---).
                        """},
                        {"role":"user", "content":transformedData}],
            max_tokens= 1000  # Increased from 500 to handle multiple issues (500 words per issue * multiple issues)
        ) 
        # print(response.choices[0].message.content)
        present_Christmas = response.choices[0].message.content
        if present_Christmas:
            print(present_Christmas)
            return present_Christmas
        else:
            sys.stderr.write('Error: API returned empty message content!')
            sys.exit(1)
    except Exception as e:
        sys.stderr.write(f'Error in API call: {str(e)}')
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv)>1:
        data = sys.argv[1]
        callApi(data)
    else:
        sys.stderr.write('no arguement passed for the api call!')
        sys.exit(1)