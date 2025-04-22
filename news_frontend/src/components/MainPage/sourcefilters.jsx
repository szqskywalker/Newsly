import React from "react";

export default function SourceFilter({
  sources,
  selectedSource,
  setSelectedSource,
  handleRefresh,
  domain,
  setDomain,
}) {
  return (
    <div className="flex items-center flex-wrap gap-4 mb-6 justify-center">
      {/* News source dropdown */}
      <select
        className="p-2 rounded border border-gray-400 w-64"
        value={selectedSource}
        onChange={(e) => setSelectedSource(e.target.value)}
      >
        <option value="">Select News Source</option>
        {sources.map((source) => (
          <option key={source.id} value={source.id}>
            {source.name}
          </option>
        ))}
      </select>

      {/* Domain input field */}
      <input
        type="text"
        placeholder="example.com"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        className="p-2 rounded border border-gray-400 w-64"
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleRefresh}
      >
        🔁 Refresh
      </button>
      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Save Filter
      </button>
    </div>
  );
}
