// components/SearchForm.tsx
import React, { useState } from "react";
import { SearchParams } from "../types/SearchParams";

interface SearchFormProps {
  onSearch: (searchParams: SearchParams) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    setSearchParams({});
    onSearch({});
  };

  // 年の範囲を生成（例：過去30年間）
  const years = Array.from(
    new Array(10),
    (val, index) => new Date().getFullYear() - index
  );

  // 四季の配列を定義
  const seasons = ["winter", "spring", "summer", "autumn"];

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-4 p-4 items-center"
      >
        <input
          type="text"
          name="title_cont"
          value={searchParams.title_cont || ""}
          onChange={handleChange}
          placeholder="作品名"
          className="px-4 py-2 text-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow w-full md:w-auto"
        />
        <input
          type="text"
          name="people_name_cont"
          value={searchParams.people_name_cont || ""}
          onChange={handleChange}
          placeholder="声優名"
          className="px-4 py-2 text-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow w-full md:w-auto"
        />
        <input
          type="text"
          name="casts_character_name_cont"
          value={searchParams.casts_character_name_cont || ""}
          onChange={handleChange}
          placeholder="キャラクター名"
          className="px-4 py-2 text-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow w-full md:w-auto"
        />
        <select
          name="year_eq"
          value={searchParams.year_eq || ""}
          onChange={handleChange}
          className="px-4 py-2 text-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
        >
          <option value="">年を選択</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          name="season_eq"
          value={searchParams.season_eq || ""}
          onChange={handleChange}
          className="px-4 py-2 text-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
        >
          <option value="">季節を選択</option>
          {seasons.map((season) => (
            <option key={season} value={season}>
              {season}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full md:w-auto"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 w-full md:w-auto"
        >
          Reset
        </button>
      </form>
    </>
  );
};

export default SearchForm;
