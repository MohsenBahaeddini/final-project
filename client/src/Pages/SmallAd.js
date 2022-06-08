import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

//have to get ad info here from homepage
const SmallAd = ({ car }) => {
  // console.log(car);
  return (
    <>
      <Wrapper>
        <Main>
          <AdsContainer>
            <ItemContainer>
              image
              <StyledLink to={`ad/${car._id}`}>
                <H1>CAR TYPE: {car.type}</H1>
              </StyledLink>
              <H1>MAKE: {car.make}</H1>
              <H1>MODEL: {car.model}</H1>
              <H1>YEAR: {car.year}</H1>
              <H1>MILEAGE: {car.mileage}km</H1>
            </ItemContainer>
          </AdsContainer>
        </Main>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  width: 100%;

  padding: 10px;
`;

const SideBar = styled.div`
  flex-basis: 10%;
  padding: 15px 20px 20px 10px;
  border-radius: 10px;
`;

const Main = styled.div`
  margin: 5px;
  padding: 10px;
  width: 80%;
  max-width: 1000px;
`;

const AdsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const ItemContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
  padding: 20px 10px 0 10px;
  margin: 0 0px 30px 20px;
  width: 200px;
  height: 320px;
  text-decoration: none;
  box-shadow: 6px 10px 79px 10px rgba(184, 178, 184, 1);
  transition: all 0.2s ease-in-out;
  color: var(--text-color);
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;
const StyledLink = styled(NavLink)`
  text-decoration: none;
  /* display: flex; */
`;

const H1 = styled.h1`
  font-size: 14px;
`;

export default SmallAd;
