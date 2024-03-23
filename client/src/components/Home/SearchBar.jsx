import React from "react";
import Button from "../utils/Button";

const SearchBar = () => {
  return (
    <div className="flex justify-center font-poppins items-center h-12 bg-background2 px-2 rounded-lg border-[#DBDBDE] border">
      <img src="/assets/svg/tabler_search.svg" />
      <input
        type="text"
        placeholder="Search projects..."
        className="w-[35rem] px-3 focus:outline-none placeholder:text-[#A9A9AF] bg-background2"
      />
      <Button text={"Search"} height={"custom"} />
    </div>
  );
};

export default SearchBar;
