<template>
    <v-container fluid fill-height>
        <v-layout justify-start column fill-height>
            <v-flex xs12 sm8 md6>
                <v-toolbar color="blue darken-3" dark>
                        <v-toolbar-title>Fragebogen</v-toolbar-title>
                        <v-spacer></v-spacer>
                    <v-btn icon @click="add()">
                        <v-icon>add</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card v-for="(question, index) in questions" :key="index">                    
                    <!-- <v-card-text> -->
                        <v-container>
                            <v-layout align-start justify-start row fill-height wrap >
                        <!-- <v-form> -->
                            <v-flex xs12 sm6 md9>
                            <v-text-field required v-model="question.question" label="Frage" type="text"></v-text-field>
                            </v-flex>
                            <!-- <v-spacer></v-spacer> -->
                            <v-flex xs12 sm6 md2>
                            <v-select
                                v-model="question.option"
                                :items="granularity"
                                label="Granularität"
                                required></v-select>
                            </v-flex>
                            <v-flex>
                                <v-btn icon @click="deleteQuestion(index)">
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </v-flex>
                            <!-- </v-form> -->
                            </v-layout>
                        </v-container>
                        
                    <!-- </v-card-text> -->
                    <!-- <v-card-actions>
                        
                    </v-card-actions> -->
                </v-card>
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
                        <v-textarea
                            outline
                            label="Kommentar"
                            v-model="comment"
                        ></v-textarea>
                    </v-card-text>
                </v-card>
                <v-card>
                    <v-btn color=primary @click="submit">Fragebogen erstellen</v-btn>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      select: null,
      mood: 0,
      comment: '',
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

    addMood: function(value) {
      this.mood = value;
      console.log(this.comment);
    },

    submit: function() {
      console.log(this.questions);
      console.log(this.mood);
      console.log(this.comment);
    }
  }
};
</script>

<style scoped>
</style>
