import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../CurrentUserContext";
const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const { currentUser } = useContext(CurrentUserContext);
  // console.log("currentUser in navbar :", currentUser);
  // const { id } = useParams();
  // console.log(id);
  return (
    <>
      <Wrapper>
        <StyledLink to="/">
          <Logo>Auto-Explorer</Logo>
        </StyledLink>
        <Container>
          {isAuthenticated && currentUser && (
            <>
              <StyledNavLink to={`/profile/${currentUser.sub}`}>
                My Account
              </StyledNavLink>
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
  padding: 10px;
  margin: 10px;

  border-bottom: 1px solid var(--color-blue);
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
  color: #fff;
  /* width: 0px;
  height: 25px; */
  &:hover {
    color: var(--color-blue);
    // text-decoration: underline;
  }
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
  font-family: var(--font-heading);

  color: #fff;
  color: var(--color-yellow);
  font-size: 22px;
  flex-basis: 33%;
`;
const StyledNavLink = styled(NavLink)`
  color: #fff;
  margin-left: 10px;
  /* font-family: var(--font-body); */
  font-size: 14px;
  text-decoration: none;
  outline: none;

  &:hover {
    color: var(--color-blue);
  }
  &.active {
    color: var(--color-yellow);

    border: none;
  }
`;

export default Navbar;
