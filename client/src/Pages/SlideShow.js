import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Thumbnail from "./Thumbnail";
import "./SlideShow.css";
import { FcPrevious, FcNext } from "react-icons/fc";

const SlideShow = ({ imgs }) => {
  /** 
   ** implementing slideShow on the adDetails page */ 
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, []);

  const next = () => {
    if (index === imgs.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };
  const prev = () => {
    if (index === 0) {
      setIndex(imgs.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  return (
    <div className="slideshow">
      <Img className="mainImg" src={imgs[index]} />
      <div className="actions">
        <button onClick={prev}>
          <FcPrevious />
        </button>
        <button onClick={next}>
          <FcNext />
        </button>
      </div>
      <Thumbnail arr={imgs} image={setIndex} index={index} />
    </div>
  );
};

const Img = styled.img`
  width: 650px;
  height: 500px;
  padding: 2px;
  border-radius: 10px;
  border: 2px solid var(--color-blue);
  @media (max-width: 720px) {
    width: 550px;
    height: 350px;
  }
  @media (max-width: 550px) {
    width: 350px;
    height: 250px;
  }
`;

export default SlideShow;
