// components/PersonSearchForm.tsx
import React, { useState } from "react";

interface PersonSearchParams {
  name_cont?: string;
}

interface PersonSearchFormProps {
  onSearch: (searchParams: PersonSearchParams) => void;
}

const PersonSearchForm: React.FC<PersonSearchFormProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<PersonSearchParams>({});

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

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    setSearchParams({});
    onSearch({});
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-4 p-4 items-center">
        <input
          type="text"
          name="name_cont"
          value={searchParams.name_cont || ""}
          onChange={handleChange}
          placeholder="声優名"
          className="px-4 py-2 text-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Reset
        </button>
      </form>
    </>
  );
};

export default PersonSearchForm;
