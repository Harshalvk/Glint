"use client";

import React, { useState } from "react";

const Styles = ({
  image,
  selectStyle,
  isSelected,
}: {
  image: string;
  selectStyle: () => void;
  isSelected: boolean;
}) => {
  const [mouseOver, setMouseOver] = useState(false);
  return (
    <div
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      onClick={selectStyle}
      className="relative w-fit cursor-pointer transition-all hover:scale-105"
    >
      {(mouseOver || isSelected) && (
        <>
          <div className="absolute border-t border-black h-4 w-4 -right-6 -top-4 -rotate-45"></div>
          <div className="absolute border-t border-black h-4 w-4 -right-3 -top-6 rotate-[-75deg]"></div>
          <div className="absolute border-t border-black h-4 w-4 -right-7 -top-0 rotate-[-20deg]"></div>
          <div className="absolute border-t border-black h-4 w-4 -bottom-6 -left-4 -rotate-45"></div>
          <div className="absolute border-t border-black h-4 w-4 -bottom-7 -left-0 rotate-[-75deg]"></div>
          <div className="absolute border-t border-black h-4 w-4 -bottom-3 -left-6 rotate-[-20deg]"></div>
        </>
      )}
      <img className="md:h-30 rounded-lg" src={image} />
    </div>
  );
};

export default Styles;
