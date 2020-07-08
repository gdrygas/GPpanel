<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app style="max-width:75%"  v-if="showMenu()" >
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

    <v-app-bar app color="indigo" dark  v-if="showMenu()">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Głospowiatu24.pl</v-toolbar-title>
    </v-app-bar>

    <v-main>
      
        <router-view />
      
    </v-main>
    
    <v-footer color="indigo" app>
      <span class="white--text">Głospowiatu24 &copy; {{ new Date().getFullYear() }} </span>
    </v-footer>
  </v-app>
</template>
<script>
import { mapState } from "vuex";
import SiteNav from "@/components/SiteNav";
import * as fb from "./firebase";

export default {
  name: "App",
  user: null,
  components: {},
  computed: {
    ...mapState(["userProfile"])
   
  },
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    
    items: [
      { title: "Główna", icon: "mdi-view-dashboard", target: "Dashboard" },
      { title: "Artykuły", icon: "mdi-help-box", target: "Reports" },
      { title: "Tematy", icon: "mdi-image", target: "subjects" },
      { title: "Klienci", icon: "mdi-image", target: "Zones" },
      { title: "Zamówienia", icon: "mdi-help-box", target: "Actions" },
      { title: "Użytkownicy", icon: "mdi-image", target: "Users" },
      
    ]
  }),
  
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    showMenu() {

      var user = fb.auth.currentUser     
      this.user = user
      if (user)
      {
        return true
      } else {
        return false
      }
    },
    goTo(target) {
      console.log(target);

      this.$router.push({ name: target });
    }
   }
};
</script>
