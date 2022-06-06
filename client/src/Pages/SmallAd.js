import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

//have to get ad info here from homepage
const SmallAd = ({ car }) => {
  console.log(car);
  return (
    <>
      <StyledLink to={`ad/${car._id}`}>
        <h1> {car.type}</h1>
      </StyledLink>
      <H1> {car.make}</H1>
      <H1> {car.model}</H1>
      <H1> {car.year}</H1>
      <H1> {car.mileage}</H1>
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
