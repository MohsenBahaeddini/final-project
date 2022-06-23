import styled from "styled-components";
import { Link, NavLink, useHistory } from "react-router-dom";

const DisplayAds = ({ car }) => {
  // Display ads on the homePage
  const numFormat = new Intl.NumberFormat();
  return (
    <Item>
      <StyledLink to={`ad/${car._id}`}>
        <Img src={car.imageUrl[0]} alt="car-img" />
        <CarInfo>
          <H1>
            {car.year} {car.make} {car.model} {car.type}
          </H1>
          <H3>MILEAGE {numFormat.format(car.mileage)} km</H3>
        </CarInfo>
        <Price>
          <H2>
            PRICE <span>${numFormat.format(car.price)}</span>
          </H2>
        </Price>
      </StyledLink>
    </Item>
  );
};
const Item = styled.div`
  display: inline-block;
  background-color: #222533;
  padding: 2px;
  margin: 10px 0px 10px 80px;
  border: 1px solid #ddd;
  border: 1px solid var(--color-blue);
  border-radius: 10px;
`;
const CarInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const Price = styled.div`
  display: block;
`;
const StyledLink = styled(NavLink)`
  text-decoration: none;
`;
const Img = styled.img`
  width: 300px;
  height: 200px;
  border: 1px solid #ddd;
  border-radius: 10px;
`;
const H1 = styled.h1`
  font-size: 14px;
  margin: 10px;
  text-align: left;
  color: var(--color-yellow);
  color: #fff;
`;
const H3 = styled.h1`
  font-size: 12px;
  text-align: left;
  color: var(--color-yellow);
  margin: -5px 10px 10px 10px;
`;
const H2 = styled.h1`
  font-size: 12px;
  text-align: right;
  color: var(--color-yellow);
  color: #fff;
  margin: 0px 10px 10px 10px;
`;
export default DisplayAds;
