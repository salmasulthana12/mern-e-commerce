import React from "react";
import loading from "./loading.gif";

const Loader = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <img src={loading} alt="loading" />
    </div>
  );
};

export default Loader;
