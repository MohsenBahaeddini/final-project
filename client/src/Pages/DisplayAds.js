import styled from "styled-components";
import { Link, NavLink, useHistory } from "react-router-dom";

const DisplayAds = ({ car }) => {
  console.log(car.imageUrl);
  return (
    <Item>
      <StyledLink to={`ad/${car._id}`}>
        <Img src={car.imageUrl[0]} />
        <CarInfo>
          <H1>
            {car.year} {car.make} {car.model} {car.type}
          </H1>
          <H3>MILEAGE {car.mileage}km</H3>
        </CarInfo>
        <Price>
          <H2>PRICE ${car.price}</H2>
        </Price>
      </StyledLink>
    </Item>
  );
};
const Item = styled.div`
  display: inline-block;
  padding: 10px;
  margin: 10px 0px 10px 80px;
  border-radius: 20px;
  box-shadow: 0px 5px 10px 0.1px #ffb600;
  /* background: #fff; */
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
  /* display: flex; */
`;
const Img = styled.img`
  width: 300px;
  height: 200px;
  border-radius: 20px;
  /* 
margin-top: -30px; */
`;
const H1 = styled.h1`
  font-size: 14px;
  text-align: left;
  color: var(--color-yellow);
`;
const H3 = styled.h1`
  font-size: 10px;
  text-align: left;
  color: var(--color-yellow);
`;
const H2 = styled.h1`
  font-size: 14px;
  text-align: right;
  color: var(--color-blue);
`;
export default DisplayAds;
