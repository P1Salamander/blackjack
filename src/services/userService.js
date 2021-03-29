import * as firebase from "../firebaseConfig";

export const createUserDocument = async (user) => {
  if (!user) return;
  const userRef = firebase.firestore.doc(`users/${user.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { email, photoURL } = user;
    const balance = 1000;
    try {
      await userRef.set({
        email,
        photoURL,
        balance,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getuserDocument(user.uid);
};
export const getuserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firebase.firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {}
};
export const updateBalance = async (user, newBalance) => {
  const userDocumentRef = await firebase.firestore.doc(`users/${user.uid}`);
  const userDocument = await userDocumentRef.get();
  user.balance = newBalance;
  const test = await userDocumentRef.set({
    balance: newBalance,
    email: userDocument.data().email,
  });
  return test;
};
