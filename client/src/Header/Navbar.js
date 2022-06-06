import { Link, NavLink, useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  return (
    <>
      <Wrapper>
        <StyledLink to="/">
          <Logo>M.B.A</Logo>
        </StyledLink>
        <Container>
          {isAuthenticated && (
            <>
              <StyledNavLink to="/profile">My Profile</StyledNavLink>
              <StyledNavLink to="/post-ad">Post Ad</StyledNavLink>
              <Button onClick={() => logout()}>Log out</Button>
            </>
          )}
          {!isAuthenticated && (
            <Button onClick={() => loginWithRedirect()}>LOG IN</Button>
          )}
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
const Button = styled.button`
  background: none;
  cursor: pointer;
  border: none;
  font-size: 14px;
  /* width: 0px;
  height: 25px; */
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
