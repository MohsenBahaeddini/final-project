import { Link, NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <>
      <Wrapper>
        <StyledLink to="/">
          <Logo>M.B.A</Logo>
        </StyledLink>
        <Container>
          <StyledNavLink to="/login">LOG IN</StyledNavLink>
          <StyledNavLink to="/signup">SIGN UP</StyledNavLink>
          <StyledNavLink to="/post-ad">Post Ad</StyledNavLink>
        </Container>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Container = styled.div`
  text-align: right;
  flex-basis: 33%;
`;

const StyledNavLink = styled(NavLink)`
  color: gray;
  margin-left: 10px;
  /* font-family: var(--font-body); */
  font-size: 12px;
  text-decoration: none;
  outline: none;

  &:hover {
    color: #3f5efb;
    text-decoration: underline;
  }
  /* 
  &.active {
    text-decoration: underline;
    color: #3f5efb;
  } */
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  outline: none;

  &:visited {
    text-decoration: none;
    color: inherit;
  }
`;
const Logo = styled.h2`
  /* font-family: var(--font-heading); */
  color: gray;
  font-size: 22px;
  flex-basis: 33%;
`;
export default Navbar;
