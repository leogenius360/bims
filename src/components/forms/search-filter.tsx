"use client";

import { useMemo, useState } from "react";

export interface SearchFilterDataProps {
  id: string;
  label: string;
}

export const SearchFilter = ({ data }: { data: SearchFilterDataProps[] }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter products based on selected categories/tags and search term
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = searchTerm
        ? item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.label.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      return matchesSearch;
    });
  }, [data, searchTerm]);

  return (
    <div className="">
      <select
        name="search-filter"
        id=""
        title="search filter"
        className="h-full w-full onborder-none bg-transparent py-1 outline-ne"
      >
        <option value="">
          <input
            type="text"
            // value={searchValue}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="h-full w-full border-none bg-transparent py-1 outline-none"
          />
        </option>
        {filteredData.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};
