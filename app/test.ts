import { Octokit } from "@octokit/rest";
import dotenv from "dotenv";

dotenv.config();

const octokit = new Octokit({
  auth: process.env.Github_API_Token,
});

let now = new Date()
const fiveMins = 5*60*1000
let timeInt  = new Date(now.getTime()-fiveMins)
let lastCheckTime  = timeInt.toISOString()

interface jsonReturn{
  author:string,
  repo:string,
  title:string,
  issue_number:number,
  body:string | null | undefined,
}

export async function pollIssues(link:string) {
  const jsonReturn:jsonReturn[]=[]
  // normalize URL (remove trailing slash)
 const cleanRepo = link.replace(/\/$/, "");
  const parts = cleanRepo.split("/");
  let owner = parts[3];
  const repo = parts[4];

  console.log(`Checking ${owner}/${repo}`);

  try {
    const { data: issues } = await octokit.issues.listForRepo({
      owner,
      repo,
      state: "open",
      per_page:6
    });

    console.log(`Fetched ${issues.length} items`);

    for (const issue of issues) {
      if ("pull_request" in issue) continue;
      console.log(`https://github.com/${owner}/${repo}/issues/${issue.number}`)
      jsonReturn.push({
        author:owner,
        repo:repo,
        title:issue.title,
        issue_number:issue.number,
        body:issue.body
      })
    }

    if (issues.length > 0) {
      lastCheckTime = new Date().toISOString();
    }
  } catch (error) {
    console.error("Error fetching issues:", error);
  }
  // console.log( jsonReturn);
  return jsonReturn
}

// pollIssues('https://github.com/asyncapi/generator')
export default pollIssues;