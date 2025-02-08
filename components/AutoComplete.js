import React, { useEffect, useState } from "react";
import "../App.css";

const AutoComplete = () => {
  const [results, setResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [showResults, setShowResults] = useState(false);

  const fetchData = async () => {
    const data = await fetch(
      "https://dummyjson.com/recipes/search?q=" + searchInput
    );
    const json = await data.json();
    setResults(json?.recipes);
  };

  useEffect(() => {
    const timer = setTimeout(fetchData, 350);

    return () => clearTimeout(timer);
  }, [searchInput]);

  return (
    <div>
      <h1>AutoComplete Search Bar</h1>
      <div>
        <input
          type="text"
          className="search-text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
        />
        {showResults && (
          <div className="results-container">
            {results.map((r) => (
              <span className="result" key={r?.id}>
                {r?.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoComplete;
