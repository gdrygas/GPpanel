<template>
  <div>
    <v-card>
      <v-card-title class="headline primary " dense >Nowy Temat</v-card-title>

      <v-card-text>
        <v-form>
          <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Na Kiedy"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="subject.date" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">Anuluj</v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(subject.date)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
    
          <v-select :items="items" label="Typ" v-model.trim="subject.type"></v-select>
          <v-select :items="priorytety" label="Priorytet" v-model.trim="subject.priorytet"></v-select>
          <v-spacer></v-spacer>
          <v-text-field label="Tytuł" required v-model.trim="subject.title" dense></v-text-field>
          <v-textarea label="Treść" required v-model.trim="subject.content" dense></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="createSubject()">Stwórz</v-btn>
        <v-btn color="red darken-1" text @click="closeDialog()">Zamknij</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: ["Pomysł", "Uwaga", "Problem", "Inne"],
    priorytety: ["Krytyczny", "Ważny", "Normalny", "Niski"],
    modal:false,
    subject: {
      title: "",
      content: "",
      type: "Pomysł",
      priorytet: "Normalny",
      date:new Date().toISOString().substr(0, 10)
    }
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
    closeDialog(event) {
      this.subject.title = "";
      this.subject.content = "";
      this.subject.type = "Pomysł";

      this.$emit("clicked");
    }
  }
};
</script>

<style>
.noborder {
  border: 0px;
}
</style>