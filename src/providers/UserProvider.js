import { Component, createContext } from "react";
import * as firebase from "../firebaseConfig";
export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = {
    user: null,
  };

  componentDidMount = async () => {
    firebase.auth.onAuthStateChanged(async (userAuth) => {
      console.log("onAuthStateChanged");
      console.log(userAuth);
      //const user = await generateUserDocument(userAuth);
      //this.setState({ user });
    });
  };

  render() {
    const { user } = this.state;

    return (
      <UserContext.Provider value={user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
