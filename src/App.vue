<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app style="max-width:75%"  v-if="showMenu()" >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link @click="logout()">
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Wyloguj</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark  v-if="showMenu()">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Głospowiatu24.pl</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <v-tooltip left></v-tooltip>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-container fluid>
      <router-view />
    </v-container>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
<script>
import { mapState } from "vuex";
import SiteNav from "@/components/SiteNav";
import * as fb from "./firebase";

export default {
  name: "App",

  components: {},
  computed: {
    ...mapState(["userProfile"])
  },
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    showMenu() {
      var user = fb.auth.currentUser
     
      if (user)
      {
        return true
      } else {
        return false
      }
    }
  }
};
</script>
