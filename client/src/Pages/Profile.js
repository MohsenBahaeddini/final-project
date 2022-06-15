import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
import MyAd from "./MyAd";
import MyConversations from "./MyConversations";
import styled from "styled-components";
const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const { currentUser } = useContext(CurrentUserContext);

  console.log(currentUser);
  console.log(JSON.stringify(user, null, 2));
  return (
    <>
      {isAuthenticated && (
        <Wrapper>
          <AccProfile>
            <Title>Account Profile</Title>
            <div>
              <div>
                <El>
                  <H3>First name</H3>
                  <H4>{user.given_name}</H4>
                </El>
                <El>
                  <H3>Last name</H3>
                  <H4>{user.family_name}</H4>
                </El>
                <El>
                  <Email>Email</Email>
                  <H4>{user.email}</H4>
                </El>
              </div>
            </div>
            <Button>Edit</Button>
          </AccProfile>
          <MyAd currentUser={currentUser} />
          <MyConversations />
        </Wrapper>
      )}
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 40px;
`;
const AccProfile = styled.div`
  border: 1px solid #ddd;
  margin: 10px;
  padding-bottom: 10px;
  min-width: calc(100vw / 3.5);
  height: fit-content;
`;
const Title = styled.h2`
  border-bottom: 1px solid var(--color-blue);
  padding: 5px;
  margin: 20px;
  text-align: left;
  font-size: 18px;
`;
const El = styled.div`
  display: flex;
  /* justify-content: space-between; */
  padding: 10px 10px 10px 20px;
`;
const H3 = styled.h3`
  padding-right: 40px;
  font-size: 16px;
`;
const H4 = styled.h3`
  font-size: 16px;
`;
const Email = styled.h3`
  padding-right: 78px;
`;
const Button = styled.button`
  cursor: pointer;
  color: var(--color-dark-blue);
  padding: 1px 15px;
  font-size: 16px;
  /* justify-content: right; */
  margin: 10px 5px 5px 20px;
  &:hover {
    /* background-color: rgba(120, 192, 227, 0.5); */
    transform: scale(1.01, 1.01);
    outline: none;
  }
`;
export default Profile;
