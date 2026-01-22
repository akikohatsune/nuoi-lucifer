import "./style.css";

const entries = [
  {
    id: "d96a7cf",
    date: "2026-01-11",
    description: "“Add Firebase auth for admin/blog” “Tweak login UI and unify input/button sizing” “Check admin role via Firestore doc” “Update Firestore rules and admin layout”",
  },
  {
    id: "b83700c",
    date: "2026-01-07",
    description: "layout fixed",
  },
  {
    id: "96b1459",
    date: "2026-01-07",
    description: "npm i @vercel/speed-insights",
  },
  {
    id: "eb71038",
    date: "2026-01-07",
    description: "Merge pull request #1 from akikohatsune/vercel/vercel-web-analytics-for-nextj-jq4mpb",
  },
  {
    id: "94ddb3e",
    date: "2026-01-06",
    description: "Implement Vercel Web Analytics for Next.js",
  },
  {
    id: "42f4d33",
    date: "2026-01-07",
    description: "// Import SpeedInsights từ Vercel để tối ưu hiệu suất import { SpeedInsights } from \"@vercel/speed-insights/next\" <SpeedInsights/>",
  },
  {
    id: "246afbf",
    date: "2026-01-07",
    description: "// Import SpeedInsights từ Vercel để tối ưu hiệu suất import { SpeedInsights } from \"@vercel/speed-insights/next\" <SpeedInsights/>",
  },
  {
    id: "8988d2f",
    date: "2026-01-06",
    description: "import { SpeedInsights } from \"@vercel/speed-insights/next\"",
  },
  {
    id: "54481b4",
    date: "2026-01-06",
    description: "fixed",
  },
  {
    id: "a49a5ae",
    date: "2026-01-05",
    description: "qqq",
  },
  {
    id: "32c99d5",
    date: "2026-01-05",
    description: "qq",
  },
  {
    id: "bcd6897",
    date: "2026-01-05",
    description: "1",
  },
  {
    id: "3b4f65e",
    date: "2026-01-05",
    description: "alo",
  },
  {
    id: "c5aaf02",
    date: "2026-01-05",
    description: "adsdsdsd",
  },
  {
    id: "d7a127b",
    date: "2026-01-05",
    description: "aaaaaaaaa",
  },
  {
    id: "fef6d05",
    date: "2026-01-05",
    description: "qqq",
  },
  {
    id: "0370e98",
    date: "2026-01-05",
    description: "a",
  },
  {
    id: "7465cb9",
    date: "2026-01-05",
    description: "55555/1",
  },
  {
    id: "e81c6cf",
    date: "2026-01-05",
    description: "5/1/2026",
  },
  {
    id: "c4878d1",
    date: "2025-12-19",
    description: "Update CSV URL for service status monitoring",
  },
  {
    id: "e766e9f",
    date: "2025-12-19",
    description: "Add service status page with real-time monitoring and styling",
  },
  {
    id: "26ef855",
    date: "2025-12-19",
    description: "Update OBS setup instructions for Alert Overlay and OverlayQR",
  },
  {
    id: "b6f6491",
    date: "2025-12-19",
    description: "Update documentation to clarify setup for Alert Overlay and OverlayQR",
  },
  {
    id: "db8abd6",
    date: "2025-12-19",
    description: "Update documentation for OBS setup and modify sender name to 'Ẩn danh'",
  },
  {
    id: "d6c1472",
    date: "2025-12-19",
    description: "Add documentation page and styles for overlay setup instructions",
  },
  {
    id: "485ae16",
    date: "2025-12-19",
    description: "Add overlay page for QR donation with styled components and hidden menu",
  },
  {
    id: "644a000",
    date: "2025-12-18",
    description: "Fix donation data mapping to use correct column name for sender",
  },
  {
    id: "1fd3b8e",
    date: "2025-12-18",
    description: "Update donation page to allow anonymous donations and modify member Discord usernames",
  },
  {
    id: "5837ead",
    date: "2025-12-18",
    description: "Fix image width in metadata for better display",
  },
  {
    id: "0fbb5cd",
    date: "2025-12-18",
    description: "Add donation page, member profiles, and improve global styles",
  },
  {
    id: "dd5bb1d",
    date: "2025-12-18",
    description: "first commit",
  },
  {
    id: "2951748",
    date: "2025-12-18",
    description: "Initial commit from Create Next App",
  },
];

const testFailMessages = new Set([
  "qqq",
  "qq",
  "1",
  "alo",
  "adsdsdsd",
  "aaaaaaaaa",
  "a",
  "55555/1",
  "5/1/2026",
]);

const isTestFail = (description: string) =>
  testFailMessages.has(description.trim());

export default function ChangelogPage() {
  return (
    <div className="container changelog-container">
      <h2>Changelog</h2>
      <p className="changelog-lead">
        Tổng hợp thay đổi dựa trên lịch sử quản lý mã nguồn.
      </p>

      <div className="changelog-list">
        {entries.map((entry) => (
          <article className="changelog-card" key={entry.id}>
            <div className="changelog-meta">
              <span className="changelog-date">{entry.date}</span>
              <span className="changelog-title">Commit {entry.id}</span>
              {isTestFail(entry.description) && (
                <span className="changelog-badge">test fail</span>
              )}
            </div>
            <p className="changelog-description">{entry.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
