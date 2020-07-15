<template>
  <div fill-height>
    <div v-for="article in articles" :key="article.title" >
      <v-card v-if="article.email == currentUser ">
        <v-card class="mx-auto" max-width="85%" style="margin:5px">
          <v-card-text>
            <div>
              <b>autor:</b>
              {{ article.userName }}
            </div>
            <p class="display-1 text--primary">{{ article.title }}</p>
            <p>{{ article.dispalyDate }}</p>
            <div class="text--primary">{{ article.content }}</div>
            <br />
            <v-divider></v-divider>
            <v-select
              :items="['draft',' pracuje nad', 'gotowe']"
              label="Status"
              v-model.trim="article.status"
            ></v-select>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-actions>
               <a href = "">Otwórz artyku w Google Drive - funkcjonalność będzie dostępna od godziny 13</a>
          </v-card-actions>
        </v-card>
      </v-card>
    </div>
  </div>
</template>

<script>
import * as fb from "../firebase";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["articles"]),
    currentUser: function(){
        return fb.auth.currentUser.email
    },


  }
};
</script>