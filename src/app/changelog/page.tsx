import "./style.css";

export const revalidate = 3600;

type GithubCommit = {
  sha: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
};

const repo = "akikohatsune/nuoi-lucifer";

const getAllCommits = async (): Promise<GithubCommit[]> => {
  const all: GithubCommit[] = [];
  let page = 1;
  while (true) {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/commits?per_page=100&page=${page}`,
      { headers: { Accept: "application/vnd.github+json" } }
    );
    if (!res.ok) break;
    const data = (await res.json()) as GithubCommit[];
    if (!Array.isArray(data) || data.length === 0) break;
    all.push(...data);
    if (data.length < 100) break;
    page += 1;
  }
  return all;
};

const formatDate = (iso: string) => iso.slice(0, 10);

export default async function ChangelogPage() {
  const entries = await getAllCommits();
  return (
    <div className="container changelog-container">
      <h2>Changelog</h2>
      <p className="changelog-lead">
        Tổng hợp thay đổi dựa trên lịch sử quản lý mã nguồn.
      </p>

      <div className="changelog-list">
        {entries.map((entry) => (
          <article className="changelog-card" key={entry.sha}>
            <div className="changelog-meta">
              <span className="changelog-date">
                {formatDate(entry.commit.author.date)}
              </span>
              <span className="changelog-title">
                Commit {entry.sha.slice(0, 7)}
              </span>
            </div>
            <p className="changelog-description">{entry.commit.message}</p>
            <a
              className="changelog-link"
              href={`https://github.com/${repo}/commit/${entry.sha}`}
              target="_blank"
              rel="noreferrer"
            >
              View commit
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
