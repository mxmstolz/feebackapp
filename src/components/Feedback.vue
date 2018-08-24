<template>
    <v-container fluid fill-height>
        <!-- <v-layout justify-start column fill-height> -->
        <v-layout>
            <v-flex xs12 sm10 offset-sm1 md10>
                <v-toolbar color=primary dark>
                    <v-toolbar-title>Feedback für {{ name }} abgeben</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon to="/">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card raised v-for="(question, index) in questions" :key="index">
                    <v-card-title>{{ question.question }}</v-card-title>
                    <v-card-text>von 0 sehr schlecht bis {{ question.granularity }} sehr gut</v-card-text>
                    <v-card-actions>
                        <v-radio-group row v-model="radioGroup[index]">
                            <v-radio v-for="n in question.granularity" :key="n" :label="n.toString()" :value="n"></v-radio>
                        </v-radio-group>
                    </v-card-actions>
                    <v-divider></v-divider>
                </v-card>
                <!-- <v-divider></v-divider> -->
                <v-card>
                    <v-container>
                        <v-layout align-start justify-space-around row fill-height>
                            <v-btn icon @click="addMood(1)">
                                <v-icon x-large color="red darken-4">sentiment_very_dissatisfied</v-icon>
                            </v-btn>
                            <v-btn icon @click="addMood(2)">
                                <v-icon x-large color="red darken-1">sentiment_dissatisfied</v-icon>
                            </v-btn>
                            <v-btn icon @click="addMood(3)">
                                <v-icon x-large color="light-green">sentiment_satisfied</v-icon>
                            </v-btn>
                            <v-btn icon @click="addMood(4)">
                                <v-icon x-large color="green darken-3">sentiment_very_satisfied</v-icon>
                            </v-btn>
                        </v-layout>
                    </v-container>
                </v-card>
                <v-card>
                    <v-card-text>
                        <v-textarea outline label="Kommentar" v-model="comment"></v-textarea>
                    </v-card-text>
                </v-card>
                <v-card>
                    <v-spacer></v-spacer>
                    <v-btn color=primary @click="submit()">Feedback abgeben</v-btn>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  created() {
    axios
      .get('http://localhost:3000/api/project_groups/' + this.id)
      .then(v => {
        // console.log(v);
        this.name = v.data.name;
        this.questions = v.data.feedbackForm;
        this.radioGroup.push(0);
        // console.log(this.questions);
      })
      .catch(error => console.log(error));
  },

  data() {
    return {
      id: this.$route.params.id,
      comment: '',
      radioGroup: [],
      mood: 0,
      name: '',
      questions: []
    };
  },
  methods: {
    addMood: function(value) {
      this.mood = value;
    },

    submit: function() {
      const questions = [];
      for (let index = 0; index < this.questions.length; index++) {
        questions.push({
          question: this.questions[index].question,
          rating: this.radioGroup[index]
        });
      }
      axios
        .post('http://localhost:3000/api/feedbacks/', {
          mood: this.mood,
          comment: this.comment,
          questions: questions,
          projectGroupId: this.id
        })
        .then(v => console.log(v.data))
        .catch(error => console.log(error));

      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.v-card__title {
  font-size: 24px;
  text-align: center;
  align-content: center;
  display: block;
}

.v-card__text {
  text-align: center;
  align-content: center;
  display: block;
}
.v-radio {
  margin: auto;
}
</style>
