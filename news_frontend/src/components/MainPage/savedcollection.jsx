import React from "react";

export default function SavedCollection({ saved }) {
  return (
    <div className="w-[35%] bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">⭐ Saved Collection</h2>
      {saved.length === 0 ? (
        <p className="text-sm text-gray-500">No saved articles yet.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {saved.map((article, idx) => (
            <li key={idx} className="border-b pb-1">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
