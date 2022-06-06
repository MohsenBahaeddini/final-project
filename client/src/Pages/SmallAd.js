import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

//have to get ad info here from homepage
const SmallAd = () => {
  return (
    <>
      {/* <StyledLink
        to={`ad/${id}`}
      > */}
      <H1>ad title</H1>
      {/* </StyledLink> */}
    </>
  );
};
const StyledLink = styled(NavLink)`
  text-decoration: none;
  display: flex;
`;

const H1 = styled.h1`
  font-size: 14px;
`;

export default SmallAd;
