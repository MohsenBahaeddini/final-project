import { useState, useEffect, useContext } from "react";
import styled from "styled-components";

const Thumbnail = ({ arr, image, index }) => {
  return (
    <div className="tumbnail">
      {arr.map((imgsrc, i) => (
        <img
          key={i}
          height="50"
          src={imgsrc}
          onClick={() => image(i)}
          className={index === i ? "active" : ""}
        />
      ))}
    </div>
  );
};
export default Thumbnail;
