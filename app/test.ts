import { Octokit } from "@octokit/rest";
import dotenv from "dotenv";

dotenv.config();

const octokit = new Octokit({
  auth: process.env.Github_API_Token,
});

let lastCheckTime = "2020-01-01T00:00:00Z";

interface payload {
  repo: string;
}

async function pollIssues(payload: payload) {
  // normalize URL (remove trailing slash)
  const cleanRepo = payload.repo.replace(/\/$/, "");
  const parts = cleanRepo.split("/");

  const owner = parts[3];
  const repo = parts[4];

  console.log(`Checking ${owner}/${repo}`);

  try {
    const { data: issues } = await octokit.issues.listForRepo({
      owner,
      repo,
      state: "open",
      since: lastCheckTime,
      per_page: 5,
    });

    console.log(`Fetched ${issues.length} items`);

    for (const issue of issues) {
      if ("pull_request" in issue) continue;

      console.log(`Issue in ${owner}/${repo}`);
      console.log(`Title: ${issue.title}`);
      console.log(`Description: ${issue.body ?? "No description"}`);
      console.log("-------------------");
    }

    if (issues.length > 0) {
      lastCheckTime = new Date().toISOString();
    }
  } catch (error) {
    console.error("Error fetching issues:", error);
  }
}

pollIssues({ repo: "https://github.com/asyncapi/website/" });
