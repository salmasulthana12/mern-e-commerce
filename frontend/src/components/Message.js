import React from "react";

const Message = ({ children, color }) => {
  return (
    <div className={`alert alert-${color}`} role="alert">
      {children}
    </div>
  );
};

export default Message;
