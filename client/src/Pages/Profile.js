import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
import MyAd from "./MyAd";
import MyConversations from "./MyConversations";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const { currentUser } = useContext(CurrentUserContext);

  console.log(currentUser);
  console.log(JSON.stringify(user, null, 2));
  return (
    <>
      {isAuthenticated && (
        <>
          <p>{user.name}</p>
          <img src={user.picture} alt={user.name} />
          <MyAd currentUser={currentUser} />
          <MyConversations />

        </>
      )}
    </>
  );
};
export default Profile;
