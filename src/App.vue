<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app style="max-width:75%" v-if="showMenu()">
      <v-list>
        <v-list-item link @click="goTo('settings')">
          <v-list-item-content>
            <!-- user AVATAR & details-->
            <v-list-item-title class="title">{{ user.displayName }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title @click="goTo(item.target)">{{ item.title }}</v-list-item-title>
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

    <v-app-bar app color="indigo" dark v-if="showMenu()">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Głospowiatu24.pl</v-toolbar-title>
     
      <v-spacer></v-spacer>
     
      
      
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer color="indigo" app>
      <span class="white--text">Głospowiatu24 &copy; {{ new Date().getFullYear() }}</span>
      <v-dialog v-model="dialog" width="85%" >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="red"
            dark
            absolute
            top
            right
            fab
            @click="dialog = false"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>

        <newSubject v-if="currentRoute() =='subjects'" @clicked="closeNewSubject()" />
      </v-dialog>
    </v-footer>
  </v-app>
</template>
<script>
import { mapState } from "vuex";
import SiteNav from "@/components/SiteNav";
import * as fb from "./firebase";
import newSubject from "@/components/newSubject";
export default {
  name: "App",
  user: null,
  components: { newSubject },
  computed: {
    ...mapState(["userProfile"])
  },
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    valid: false,
    dialog: false,
    items: [
      //  { title: "Główna", icon: "mdi-view-dashboard", target: "Dashboard" },
      { title: "Artykuły", icon: "mdi-help-box", target: "articles" },
      { title: "Tematy", icon: "mdi-image", target: "subjects" }
      //  { title: "Klienci", icon: "mdi-image", target: "Zones" },
      //  { title: "Zamówienia", icon: "mdi-help-box", target: "Actions" },
      //  { title: "Użytkownicy", icon: "mdi-image", target: "Users" },
    ]
  }),

  methods: {
    currentRoute: function() {
      return this.$router.currentRoute.name;
    },
    logout() {
      this.$store.dispatch("logout");
    },
    showMenu() {
      var user = fb.auth.currentUser;
      this.user = user;
      if (user) {
        return true;
      } else {
        return false;
      }
    },
    goTo(target) {
      this.$router.push({ name: target });
    },
    closeNewSubject() {
      this.dialog = false;
    },
    dispatchAddAction() {
      if (this.$router.currentRoute.name === "subjects") {
        this.dialog = true;
      }
    }
  }
};
</script>
