import React from "react";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <main className="relative h-auto">
      <img src="/assets/images/BackgroundImage.jpg" alt="" />
      <div className="w-auto text-center absolute  left-[50%] translate-x-[-50%] top-[4.5rem]">
        <div className="font-remBold text-nowrap text-[3.5rem] leading-none">
          A Showcase Of Student-driven <br /> Innovation
        </div>
        <div className="font-poppins p-4 mt-3 text-foreground2">
          Browse through a diverse collection of innovative projects, <br />
          each a testament to the dedication and ingenuity of our young minds.
        </div>
        <div className="inline-block mt-2">
          <SearchBar />
        </div>
      </div>
      <img
        src="/assets/images/Saly1.png"
        className="absolute bottom-20 right-32"
        alt=""
      />
      <img
        src="/assets/images/Saly2.png"
        className="absolute bottom-14 left-20"
        alt=""
      />
    </main>
  );
};

export default Hero;
