import styled from "styled-components";
import { Link, NavLink, useHistory } from "react-router-dom";

const DisplayAds = ({ car }) => {
  return (
    <>
      <img src={car.imageUrl} />

      <StyledLink to={`ad/${car._id}`}>
        <H1>CAR TYPE: {car.type}</H1>
      </StyledLink>
      <H1>MAKE: {car.make}</H1>
      <H1>MODEL: {car.model}</H1>
      <H1>YEAR: {car.year}</H1>
      <H1>MILEAGE: {car.mileage}km</H1>
      <H1>PRICE: ${car.price}</H1>
    </>
  );
};
const StyledLink = styled(NavLink)`
  text-decoration: none;
  /* display: flex; */
`;

const H1 = styled.h1`
  font-size: 14px;
`;
export default DisplayAds;
