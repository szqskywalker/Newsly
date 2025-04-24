import React from "react";
import { Typography } from "@mui/material";
import { FaStar } from "react-icons/fa";

export default function SavedCollection({ saved }) {
  return (
    <div className="w-[35%] h-[650px] flex flex-col rounded-xl shadow-lg border border-gray-700 bg-[#1a1a1a] text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-center mb-4 space-x-2">
        <FaStar className="text-yellow-400 text-xl" />
        <Typography
          variant="h6"
          className="font-semibold tracking-wide text-white"
        >
          Saved Collection
        </Typography>
      </div>

      {/* Empty State */}
      {saved.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm italic">
          No saved articles yet.
        </div>
      ) : (
        <div className="overflow-y-auto flex-1 rounded-md border border-gray-600 scroll-smooth scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 z-10 bg-gradient-to-r from-[#2f2f2f] to-[#1e1e1e] text-gray-200">
              <tr>
                <th className="text-left px-4 py-2 border-b border-gray-700 font-medium">
                  #
                </th>
                <th className="text-left px-4 py-2 border-b border-gray-700 font-medium">
                  Title
                </th>
                <th className="text-left px-4 py-2 border-b border-gray-700 font-medium">
                  Link
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {saved.map((article, idx) => (
                <tr key={idx} className="hover:bg-gray-800 transition-colors">
                  <td className="px-4 py-2 text-gray-300">{idx + 1}</td>
                  <td className="px-4 py-2 max-w-[200px] truncate text-gray-200">
                    {article.title}
                  </td>
                  <td className="px-4 py-2">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline font-medium"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
