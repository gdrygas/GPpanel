<template>
  <div>
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>Nowy Temat</v-card-title>

      <v-card-text>
        <v-form>
          <v-text-field label="Tytuł" required v-model.trim="subject.title" class="noborder"></v-text-field>
          <v-select :items="items" label="Typ" v-model.trim="subject.type" solo dense></v-select>
          <v-textarea label="Treść" required v-model.trim="subject.content"></v-textarea>
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
    subject: {
      title: "",
      content: "",
      type: "Pomysł"
    }
  })
};
</script>

<style>
.noborder {
  border: 0px;
}
</style>