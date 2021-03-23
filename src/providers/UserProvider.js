import { createContext, useEffect, useState } from "react";
import * as firebase from "../firebaseConfig";
import * as userService from "../services/userService";
import { ProgressSpinner } from "primereact/progressspinner";
import "./UserProvider.css";
export const UserContext = createContext({ user: null });

function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      setLoading(false);
      if (user.email === "v3@abv.bg") {
        firebase.auth.signOut();
      } else {
        setCurrentUser(user);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={currentUser}>
      {loading ? (
        <div className="content p-grid p-align-center p-m-0">
          <div className="p-md-6 p-sm-10 p-lg-3 p-d-block p-mx-auto">
            <div className="spinnerContainer">
              <ProgressSpinner className="p-d-block p-mx-auto" />
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
}

export default UserProvider;
