import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    if (query) navigate(`/project/all?title=${query}`);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex justify-center font-poppins items-center h-12 bg-background2 px-2 rounded-lg border-[#DBDBDE] border">
      <img src="/assets/svg/tabler_search.svg" />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search projects..."
        className="w-[35rem] px-3 focus:outline-none placeholder:text-[#A9A9AF] bg-background2"
      />
      <Button
        onClick={handleClick}
        className="text-white bg-orange rounded-md drop-shadow font-rem text-md"
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
