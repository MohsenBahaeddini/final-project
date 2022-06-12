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
                  <h4>{user.given_name}</h4>
                </El>
                <El>
                  <H3>Last name</H3>
                  <h4>{user.family_name}</h4>
                </El>
                <El>
                  <Email>Email</Email>
                  <h4>{user.email}</h4>
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
  /* justify-content: space-between; */
  margin: 20px 40px;
`;
const AccProfile = styled.div`
  border: 1px solid #ddd;
  margin: 10px;
  min-width: calc(100vw / 3.5);
`;
const Title = styled.h2`
  border-bottom: 1px solid #ddd;
  padding: 5px;
  margin: 20px;
  text-align: left;
`;
const El = styled.div`
  display: flex;
  /* justify-content: space-between; */
  padding: 10px 10px 10px 20px;
`;
const H3 = styled.h3`
  padding-right: 50px;
`;
const Email = styled.h3`
  padding-right: 88px;
`;
const Button = styled.button`
  cursor: pointer;
  color: var(--color-blue);
  padding: 3px 20px;
  /* justify-content: right; */
  margin: 20px 5px 5px 300px;
`;
export default Profile;
