<template>
  <v-container>
    <v-btn color="pink" dark absolute top right fab @click.stop="dialog = true">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
 <v-container height="fluid" fill-height>
      <v-row dense>
        <v-col cols="12">
          <div v-for="subject in subjects" :key="subject.id">
            <v-card
              class="mx-auto"
              max-width="85%"
              style="margin:5px"
              v-if="  subject.status != 'article'"
            >
              <v-card-text>
                <div>
                  <b>autor:</b>
                  {{ subject.userName }}
                </div>
                <p class="display-1 text--primary">{{ subject.title }}</p>
                <p>{{ subject.dispalyDate }}</p>
                <div class="text--primary">{{ subject.content}}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  text
                  color="deep-purple accent-4"
                  @click="takeover = true, currentSubject = subject"
                >Przejmij</v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-col>
      </v-row>
      <v-dialog v-model="takeover" max-width="290">
        <v-card>
          <v-card-title class="headline">Nowy artykuł</v-card-title>

          <v-card-text>
            Zmieniasz pomysł w artykuł.
            <br />
            <b>Na pewno?</b>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="red darken-1" text @click="takeover = false">Nie</v-btn>

            <v-btn color="green darken-1" text @click="articleTakeover()">Tak</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-container>
</template>

<script>
import * as fb from "../firebase";
import { mapState } from "vuex";

export default {
  data: () => ({
   
    takeover: false,
    currentSubject: null,
    dialog: false,
    valid: false,
    firstname: "",
    lastname: "",
    nameRules: [
      v => !!v || "Tytuł jest wymagany",
      v => v.length <= 200 || "Tytuł musi mieć mniej niż 200 znaków"
    ],
    contentRules: [
      v => !!v || "Tytuł jest wymagany",
      v => v.length <= 2000 || "Treść musi mieć mniej niż 2000 znaków"
    ]
  }),
  methods: {
    
    articleTakeover() {
      this.takeover = false;
      this.currentSubject.status = "article";
      this.$store.dispatch("updateSubject", this.currentSubject);
      let article = {
        title: this.currentSubject.title,
        content: this.currentSubject.content,
        status: 'draft',
        subjectId: this.currentSubject.id
      }
      this.$store.dispatch("createArticle", article);
    }
  },
  computed: {
    ...mapState(["subjects"])
  }
};
</script>