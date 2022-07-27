import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
import MyAd from "./MyAd";
import MyConversations from "./MyConversations";
import styled from "styled-components";
import SavedAds from "./SavedAds";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <>
      {isAuthenticated && (
        <Div>
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
            </AccProfile>
            <MyAd currentUser={currentUser} />
            <MyConversations /> <SavedAds user={currentUser} />
          </Wrapper>
        </Div>
      )}
    </>
  );
};
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 370px);
  justify-content: flex-start;
  gap: 5%;
  row-gap: 1%;
  margin: 20px 40px;
  position: relative;
  @media (max-width: 1350px) {
    justify-content: space-evenly;
    align-items: center;
    margin: 20px 50px 50px 0px;
  }
  @media (max-width: 420px) {
    margin-left: 70px;
  }
`;

const Div = styled.div`
  position: relative;
`;
const AccProfile = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  background: var(--color-darkGrey);
  margin: 10px;
  padding-bottom: 10px;
  min-width: 402px;
  width: 402px;
  min-height: 250px;
  height: fit-content;
  @media (max-width: 420px) {
    min-width: 330px;
    width: 330px;
  }
`;
const Title = styled.h2`
  border-bottom: 1px solid var(--color-blue);
  padding: 5px;
  margin: 20px;
  text-align: left;
  font-size: 18px;
  color: #fff;
`;
const El = styled.div`
  display: flex;
  padding: 10px 10px 10px 20px;
`;
const H3 = styled.h3`
  padding-right: 40px;
  font-size: 15px;
  color: #fff;
`;
const H4 = styled.h3`
  font-size: 15px;
  color: #fff;
`;
const Email = styled.h3`
  padding-right: 75px;
  font-size: 15px;
`;
const Button = styled.button`
  cursor: pointer;
  font-family: var(--font-heading);
  color: var(--color-dark-blue);
  padding: 1px 15px;
  font-size: 16px;
  margin: 10px 5px 5px 20px;
  &:hover {
    transform: scale(1.01, 1.01);
    outline: none;
  }
`;
export default Profile;
