import { auth, usersCollection } from "../includes/firebase";
import { defineStore } from "pinia";

export default defineStore("user", {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {
    // Sign Up
    async register(values) {
      const userCred = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );
      await usersCollection.doc(userCred.user.uid).set({
        email: values.email,
        name: values.name,
        age: values.age,
        country: values.country,
      });

      await userCred.user.updateProfile({
        displayName: values.name,
      });

      console.log("current user:", auth.currentUser);
      this.userLoggedIn = true;
    },

    // Sign In
    async authenticate(values) {
      await auth.signInWithEmailAndPassword(values.email, values.password);
      this.userLoggedIn = true;
    },

    // Sign Out
    async signOut() {
      await auth.signOut();
      this.userLoggedIn = false;
    },
  },
});
