<template>
    <v-container fluid fill-height>
        <!-- <v-layout justify-start column fill-height> -->
        <v-layout>
            <v-flex xs12 sm10 offset-sm1 md10>
                <v-toolbar color="blue darken-3" dark>
                    <v-toolbar-title>Fragebogen</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon to="/">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card>
                    <v-card-title>
                        <v-text-field outline required v-model="projectName" label="Projektname" type="text"></v-text-field>
                    </v-card-title>
                </v-card>
                <!-- <v-divider></v-divider> -->
                <v-card v-for="(question, index) in questions" :key="index">
                    <!-- <v-card-text> -->
                    <v-container>
                        <v-layout align-start justify-start row fill-height wrap>
                            <!-- <v-form> -->
                            <v-flex xs12 sm6 md9>
                                <v-text-field required v-model="question.question" label="Frage" type="text"></v-text-field>
                            </v-flex>
                            <!-- <v-spacer></v-spacer> -->
                            <v-flex xs12 sm6 md2>
                                <v-select v-model="question.option" :items="granularity" label="Granularität" required></v-select>
                            </v-flex>
                            <v-flex>
                                <v-btn icon @click="deleteQuestion(index)">
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </v-flex>
                            <!-- </v-form> -->
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
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
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
    add: function() {
      this.questions.push({ question: '', option: null });
    },

    deleteQuestion: function(index) {
      this.$delete(this.questions, index);
    },

    submit: function() {
      console.log(this.projectName);
      console.log(this.questions);
      axios
        .post('/project_groups', {
          name: this.projectName,
          managerId: this.memberId
        })
        .then(v => {
          this.projectId = v.data.id;
          this.postQuestions();
          this.$router.push('/');
          //   console.log('ID ist: ' + this.projectId);
        })
        .catch(error => console.log(error));
    },

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
            //   console.log('ID ist: ' + this.projectId);
          })
          .catch(error => console.log(error));
      });
    }
  }
};
</script>

<style scoped>
</style>
