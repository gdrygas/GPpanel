<template>
  <v-container>
    <v-btn color="pink" dark absolute top right fab @click.stop="dialog = true">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="85%">
      <v-card>
        <v-card-title>Nowy temat</v-card-title>

        <v-card-text>
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    :rules="nameRules"
                    :counter="200"
                    label="Tytuł"
                    required
                    v-model.trim="subject.title"
                  ></v-text-field>
                </v-col>
                <!--        <v-col cols="12" md="4">
                  <v-select
                    :items="['Pomysł',' Problem', 'Uwaga']"
                    label="Typ"
                    v-model.trim="subject.type"
                  ></v-select>
                </v-col>-->
                <v-col cols="12" md="4">
                  <v-textarea
                    :rules="contentRules"
                    :counter="2000"
                    label="Treść"
                    required
                    v-model.trim="subject.content"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="createSubject()">Stwórz</v-btn>

          <v-btn color="red darken-1" text @click="closeDialog()">Zamknij</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-container height="fluid" fill-height>
      <v-row dense>
        <v-col cols="12">
          <div v-for="subject in subjects" :key="subject.title">
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
    subject: {
      title: "",
      content: "",
      type: "Pomysł"
    },
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
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  }),
  methods: {
    createSubject() {
      if (this.subject.title == "") return false;
      if (this.subject.content == "") return false;

      let subject = {
        title: this.subject.title,
        content: this.subject.content,
        type: this.subject.type,
        status: "active"
      };

      this.$store.dispatch("createSubject", subject);
      this.closeDialog();
    },
    closeDialog() {
      this.subject.title = "";
      this.subject.content = "";
      this.subject.type = "Pomysł";
      this.dialog = false;
    },
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