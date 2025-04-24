import React from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

export default function NewsTable({
  articles,
  page,
  setPage,
  handleSave,
  expandedIds,
  setExpandedIds,
}) {
  const theme = useTheme([
    getTheme(),
    {
      Table: `
        --data-table-library_grid-template-columns: 2fr 1fr 1fr 1fr 0.5fr;
        background-color: #1f1f1f;
        color: #e5e5e5;
      `,
      HeaderRow: `
        background-color: #111827;
        font-weight: bold;
        color: #f9fafb;
      `,
      Row: `
        background-color: #1f2937;
        border-bottom: 1px solid #374151;
        transition: background 0.2s;
      `,
      Row_hover: `
        background-color: #374151;
      `,
    },
  ]);

  const articlesPerPage = 10;
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const paginatedArticles = articles.slice(
    (page - 1) * articlesPerPage,
    page * articlesPerPage
  );

  const handleExpand = (item) => {
    setExpandedIds((prev) =>
      prev.includes(item.url)
        ? prev.filter((id) => id !== item.url)
        : [...prev, item.url]
    );
  };

  const COLUMNS = [
    { label: "Title", renderCell: (item) => item.title },
    { label: "Author", renderCell: (item) => item.author || "Unknown" },
    { label: "Source", renderCell: (item) => item.source.name },
    {
      label: "Published",
      renderCell: (item) =>
        new Date(item.publishedAt).toLocaleDateString("en-US"),
    },
    {
      label: "Save",
      renderCell: (item) => (
        <button
          onClick={() => handleSave(item)}
          className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white text-sm font-medium px-3 py-1 rounded shadow transition duration-200"
        >
          Save
        </button>
      ),
    },
  ];

  const ROW_PROPS = {
    onClick: handleExpand,
  };

  const ROW_OPTIONS = {
    renderAfterRow: (item) =>
      expandedIds.includes(item.url) && (
        <tr style={{ gridColumn: "1 / -1", backgroundColor: "#f9f9f9" }}>
          <td colSpan={COLUMNS.length} style={{ padding: "1rem" }}>
            <div
              style={{ fontSize: "14px", color: "#1f2937", lineHeight: "1.6" }}
            >
              <div style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: "600", color: "#111827" }}>
                  Description:
                </span>{" "}
                <span>{item.description || "N/A"}</span>
              </div>
              <div style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: "600", color: "#111827" }}>
                  Content:
                </span>{" "}
                <span>{item.content || "N/A"}</span>
              </div>
              {item.urlToImage && (
                <div style={{ padding: "12px 0", textAlign: "center" }}>
                  <img
                    src={item.urlToImage}
                    alt="article visual"
                    style={{
                      maxHeight: "200px",
                      width: "auto",
                      objectFit: "contain",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    }}
                  />
                </div>
              )}
              <div>
                <span style={{ fontWeight: "600", color: "#111827" }}>
                  URL:
                </span>{" "}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#2563eb",
                    textDecoration: "underline",
                    fontWeight: "500",
                  }}
                >
                  Read more
                </a>
              </div>
            </div>
          </td>
        </tr>
      ),
  };

  const data = { nodes: paginatedArticles };

  return (
    <div className="w-[65%] bg-[#1a1a1a] p-4 rounded-xl shadow-md text-white h-[650px] shadow-lg border border-gray-700">
      <h2 className="text-2xl font-semibold mb-5 text-white">Filtered News</h2>
      <CompactTable
        columns={COLUMNS}
        data={data}
        theme={theme}
        rowProps={ROW_PROPS}
        rowOptions={ROW_OPTIONS}
      />
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-40 hover:bg-gray-600 transition"
        >
          &lt; Prev
        </button>
        <span className="text-sm text-gray-400">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-40 hover:bg-gray-600 transition"
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
}
