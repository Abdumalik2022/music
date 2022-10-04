<template>
  <AppHeader />

  <router-view> </router-view>
  <Player />
  <Auth />
</template>
<script>
import Auth from "./components/Auth.vue";
import AppHeader from "./components/Header.vue";
import { mapWritableState } from "pinia";
import useUserStore from "./stores/user";
import { auth } from "./includes/firebase";
import Player from "./components/Player.vue";

export default {
  name: "App",
  components: {
    Auth,
    AppHeader,
    Player,
  },
  computed: {
    ...mapWritableState(useUserStore, ["userLoggedIn"]),
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true;
    }
  },
};
</script>
