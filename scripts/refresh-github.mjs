import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
const repos = JSON.parse(
  execFileSync(
    "gh",
    ["api", "users/veerendranadhreddy11/repos", "--paginate"],
    { encoding: "utf8" },
  ),
);
const snapshot = {
  verifiedAt: new Date().toISOString(),
  account: "veerendranadhreddy11",
  method:
    "GitHub REST API via maintainer authentication; no credentials are stored",
  repositories: repos.map((r) => ({
    name: r.name,
    url: r.html_url,
    description: r.description,
    language: r.language,
    defaultBranch: r.default_branch,
    pushedAt: r.pushed_at,
  })),
};
await mkdir("public/data", { recursive: true });
await writeFile(
  "public/data/github.json",
  JSON.stringify(snapshot, null, 2) + "\n",
);
console.log(
  "Saved public repository metadata only. Review project descriptions after any repository changes.",
);
