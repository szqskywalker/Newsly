import React, { useEffect, useState } from "react";
import FilterForm from "./filterform";
import NewsTable from "./newstable";
import SavedCollection from "./savedcollection";

const API_KEY = "3d83b1afc782411490c8c8ebde73f320";

export default function MainPage() {
  const [articles, setArticles] = useState([]);
  const [saved, setSaved] = useState([]);
  const [page, setPage] = useState(1);
  const [expandedIds, setExpandedIds] = useState([]);

  const [sources, setSources] = useState([]);

  useEffect(() => {
    fetch(`https://newsapi.org/v2/top-headlines/sources?apiKey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setSources(data.sources))
      .catch((err) => console.error("Error fetching sources:", err));
  }, []);

  const [filters, setFilters] = useState({
    q: "",
    searchIn: [],
    sources: "", // used in place of selectedSource
    domains: "",
    excludeDomains: "",
    from: "",
    to: "",
    language: "",
    sortBy: "publishedAt",
  });

  const buildQueryParams = () => {
    const params = new URLSearchParams();
    params.append("apiKey", API_KEY);
    if (filters.q) params.append("q", filters.q);
    if (filters.searchIn.length > 0)
      params.append("searchIn", filters.searchIn.join(","));
    if (filters.sources) params.append("sources", filters.sources);
    if (filters.domains) params.append("domains", filters.domains);
    if (filters.excludeDomains)
      params.append("excludeDomains", filters.excludeDomains);
    if (filters.from) params.append("from", filters.from);
    if (filters.to) params.append("to", filters.to);
    if (filters.language) params.append("language", filters.language);
    params.append("sortBy", filters.sortBy || "publishedAt");
    params.append("pageSize", "40");
    params.append("page", page.toString());
    return params.toString();
  };

  const onSearch = () => {
    const { q, sources, domains } = filters;

    if (!q && !sources && !domains) {
      alert(
        "Please enter a search keyword, select a source, or specify domains."
      );
      return;
    }

    const url = `https://newsapi.org/v2/everything?${buildQueryParams()}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "error") throw new Error(data.message);
        setArticles(data.articles || []);
        setPage(1); // reset to first page
      })
      .catch((err) => alert("Error: " + err.message));
  };

  const handleSave = (article) => {
    if (!saved.find((a) => a.url === article.url)) {
      setSaved([...saved, article]);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-black font-sans">
      <FilterForm
        filters={filters}
        setFilters={setFilters}
        onSearch={onSearch}
        sources={sources}
      />
      <div className="flex gap-4">
        <NewsTable
          articles={articles}
          page={page}
          setPage={setPage}
          handleSave={handleSave}
          expandedIds={expandedIds}
          setExpandedIds={setExpandedIds}
        />
        <SavedCollection saved={saved} />
      </div>
    </div>
  );
}
