<template>
    <v-container fluid fill-height>
        <v-layout>
            <v-flex xs12 sm10 offset-sm1 md10>
                <v-toolbar color="blue darken-3" dark>
                    <v-toolbar-title>Fragebogen</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon to="/">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card>
                        <v-card-title>
                            <v-text-field :rules="[v => !!v || 'Es muss ein Projektname angegeben werden']" outline required v-model="projectName" label="Projektname" type="text"></v-text-field>
                        </v-card-title>
                    </v-card>
                    <v-card v-for="(question, index) in questions" :key="index">
                        <v-container>
                            <v-layout align-start justify-start row fill-height wrap>
                                <v-flex xs12 sm6 md9>
                                    <v-text-field :rules="[v => !!v || 'Es muss eine Frage angegeben werden']" required v-model="question.question" label="Frage" type="text"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md2>
                                    <v-select :rules="[v => !!v || 'Es muss eine Granularität ausgewählt werden']" v-model="question.option" :items="granularity" label="Granularität" required></v-select>
                                </v-flex>
                                <v-flex>
                                    <v-btn icon @click="deleteQuestion(index)">
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-divider></v-divider>
                    </v-card>
                    <v-card>
                        <v-card-actions>
                            <!-- Weitere Frage hinzufügen -->
                            <v-btn color=secondary @click="add">
                                Weitere Frage hinzufügen
                                <v-icon>add</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color=primary @click="submit">Fragebogen erstellen</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      projectId: '',
      projectName: '',
      select: null,
      memberId: this.$store.state.memberId,
      count: 1,
      questions: [{ question: '', option: null }],
      granularity: [4, 6, 8, 10]
    };
  },
  methods: {
    //   add new questionrow
    add: function() {
      this.questions.push({ question: '', option: null });
    },

    // delete questionrow
    deleteQuestion: function(index) {
      this.$delete(this.questions, index);
    },

    // validate the form and create a new project
    submit: function() {
      axios.defaults.headers.common['Authorization'] = this.$store.state.token;
      if (this.$refs.form.validate()) {
        axios
          .post('/project_groups', {
            name: this.projectName,
            managerId: this.memberId
          })
          .then(v => {
            this.projectId = v.data.id;
            this.postQuestions();
            this.$router.push('/');
          })
          .catch(error => console.log(error));
      }
    },

    // create the feedbackbow
    postQuestions: function() {
      axios.defaults.headers.common['Authorization'] = this.$store.state.token;
      this.questions.forEach(v => {
        axios
          .post('/feedback_questions', {
            question: v.question,
            granularity: v.option,
            projectGroupId: this.projectId
          })
          .then(v => {
            console.log(v);
          })
          .catch(error => console.log(error));
      });
    }
  }
};
</script>

<style scoped>
</style>
