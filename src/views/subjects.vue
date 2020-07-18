<template>
  <div style="position: sticky;">     
      <v-tabs background-color="indigo" dark  >
        <v-tab @click="selectTab(1)">Moje</v-tab>
        <v-tab @click="selectTab(2)">Giełda</v-tab>
      </v-tabs>
    <div >
    <div v-for="subject in subjects" :key="subject.id">
      <v-card
        style="margin:5px; margin-bottom:10px"
        v-if="(subject.status != 'article' & whatToDisplay(subject.userId,userProfile.uid))"
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
</div>
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

  </div>
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
    tab: 2
  }),
  methods: {
    articleTakeover() {
      this.takeover = false;
      this.currentSubject.status = "article";
      this.$store.dispatch("updateSubject", this.currentSubject);
      let article = {
        title: this.currentSubject.title,
        content: this.currentSubject.content,
        status: "draft",
        subjectId: this.currentSubject.id
      };
      this.$store.dispatch("createArticle", article);
    },
    selectTab(tabNo) {
      this.tab = tabNo;
    },
    whatToDisplay(sUid, cUid) {
      if (this.tab == 1) {
        return sUid == cUid;
      }
      if (this.tab == 2) {
        return true;
      }
      return null;
    }
  },
  computed: {
    ...mapState(["subjects"]),
    ...mapState(["userProfile"])
  }
};
</script>