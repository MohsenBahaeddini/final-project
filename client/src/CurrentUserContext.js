import { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setCurrentUser(user);
    setStatus("idle");
  }, [user]);

  // check if user is new and then do fetch post
  // how to check if cx is new? user.sub or user.email  (user id exists?)
 

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, status, setStatus, user }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

// function (user, context, callback) {
//     var request = require('request');
//     if (context.stats.loginsCount === 1) {
//         request({
//           method: 'POST',
//           url: 'https://yourapiurl/organizations',
//           json: {
//             "name": user.user_metadata.organization
//           }
//         },
//         function(err, response, body) {
//           if (err) {
//             console.log('err: ', err);
//             callback(err);
//           } else {
//             console.log('Organization record created successfully', body.id);
//             user.user_metadata.organizationId = body.id;
//             context.idToken[configuration.NAMESPACE] = {
//               organizationId: body.id
//             };
//             auth0.users.updateUserMetadata(user.user_id, user.user_metadata)
//             .then(function(){
//               callback(null, user, context);
//             }).catch(function(err){
//               callback(err);
//             });
//           }
//         });
//     } else {
//       callback(null, user, context);
//     }
//   }
