import React from "react";
const BGTHEME = ({
  bgImage = "https://via.placeholder.com/800x400.png?text=Background+Image",
  children,
}) => {
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
          paddingTop: "10vh",
          paddingBottom: "10vh",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BGTHEME;
