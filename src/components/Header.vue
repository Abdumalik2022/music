<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        :to="{ name: 'home' }"
        class="text-white font-bold uppercase text-2xl mr-4"
        active-class="no-active"
        >{{ $t("header.music") }}</router-link
      >
      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li v-if="!userStore.userLoggedIn">
            <a
              class="px-2 text-white"
              href="#"
              @click.prevent="toogleAuthModal"
            >
              {{ $t("header.login_or_register") }}
            </a>
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" :to="{ name: 'manage' }">{{
                $t("header.manage")
              }}</router-link>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signOut">{{
                $t("header.logout")
              }}</a>
            </li>
          </template>
        </ul>
        <ul class="ml-auto text-white">
          <li class="px-2">
            <a href="#" @click.prevent="changeLocale">{{ currentLocale }}</a>
            <i class="m-2 font-bold text-xl fa fa-globe"></i>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapWritableState, mapStores } from "pinia";
import useModalStore from "../stores/modal";
import useUserStore from "../stores/user";

export default {
  name: "AppHeader",
  computed: {
    ...mapWritableState(useModalStore, ["isOpen"]),
    ...mapStores(useUserStore),
    currentLocale() {
      return this.$i18n.locale === "ru" ? "English" : "Russian";
    },
  },
  methods: {
    toogleAuthModal() {
      this.isOpen = !this.isOpen;
    },
    signOut() {
      this.userStore.signOut();
      if (this.$route.name === "manage") {
        this.$router.push({ name: "home" });
      }
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === "ru" ? "en" : "ru";
    },
  },
};
</script>
