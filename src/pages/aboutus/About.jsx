import React from "react";

export const About = (props) => {
  console.log(props);
  const handleOnClick = () => {
    window.history.back();
  };
  return (
    <>
      <div>About</div>
      <button onClick={handleOnClick}>go back</button>
    </>
  );
};
