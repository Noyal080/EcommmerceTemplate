import React from "react";
const BGTHEME = ({ bgImage, children }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(to bottom right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)",
          paddingTop,
          paddingBottom,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BGTHEME;
