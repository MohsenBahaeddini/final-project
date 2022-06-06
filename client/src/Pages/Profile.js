import { useAuth0 } from "@auth0/auth0-react";
const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  console.log(JSON.stringify(user, null, 2));
  return (
    <>
      {isAuthenticated && (
        <>
          <p>{user.name}</p>
          <img src={user.picture} alt={user.name} />
        </>
      )}
    </>
  );
};
export default Profile;
