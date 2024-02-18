// components/SearchForm.tsx
import React, { useState } from "react";
import { SearchParams } from "../types/SearchParams";

interface SearchFormProps {
  onSearch: (searchParams: SearchParams) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title_cont"
          value={searchParams.title_cont || ""}
          onChange={handleChange}
          placeholder="作品名"
        />
        <input
          type="text"
          name="people_name_cont"
          value={searchParams.people_name_cont || ""}
          onChange={handleChange}
          placeholder="声優名"
        />
        <input
          type="text"
          name="casts_character_name_cont"
          value={searchParams.casts_character_name_cont || ""}
          onChange={handleChange}
          placeholder="キャラクター名"
        />
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default SearchForm;
