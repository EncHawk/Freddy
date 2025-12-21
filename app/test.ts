import { Octokit } from "@octokit/rest";
import dotenv from 'dotenv'
dotenv.config()
const octokit = new Octokit({ auth:process.env.Token});
// Keep track of the last issue we processed
let lastCheckTime = new Date().toISOString();
console.log('sip')
interface payload{
    owner:string,
    repo:string,
    state?:string
}
async function pollIssues(payload:payload) {
  try {
    const { data: issues } = await octokit.issues.listForRepo({
      owner: payload.owner,
      repo: payload.repo,
      state: "open",
      since: lastCheckTime, // Only get issues updated since last check
    });

    for (const issue of issues) {
      // GitHub 'since' filter includes updates, so we check creation time
        console.log(`preexisting Issue in ${payload.repo}:`);
        console.log(`Title: ${issue.title}`);
        console.log(`Description: ${issue.body}`);
        console.log("-------------------");
    }

    // Update the timestamp to now
    if (issues.length > 0) {
      lastCheckTime = new Date().toISOString();
    }
  } catch (error) {
    console.error("Error fetching issues:", error);
  }
}

// Poll every 60 seconds
export default pollIssues;