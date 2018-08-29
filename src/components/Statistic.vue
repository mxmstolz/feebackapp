<template>
  <v-container fluid fill-height>
    <v-layout row>
      <v-flex xs12 sm10 md10 offset-sm1>
        <v-card>
          <v-toolbar color=primary dark>
            <v-toolbar-title>Statistiken des Projekts {{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon to="/">
              <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
        <v-card>
          <v-card-title>
            <v-select v-model="question" :items="questions" @change="change" label="Wähle eine Frage aus" outline></v-select>
          </v-card-title>
        </v-card>
        <v-card v-if="selected">
          <chart1 :weeks="weeks" :avgRating="avgRating" :key="question">
          </chart1>
        </v-card>
        <v-card>
          <chart2 v-if="gotData">
          </chart2>
        </v-card>
        <v-card>
          <v-card-text>
            <v-textarea outline readonly name="comment" label="Kommentare" v-model="comments[index]"></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn color=secondary @click="index--" v-if="index > 0">
              vorheriger Kommentar
            </v-btn>
            <v-btn color=secondary v-else disabled="">
              vorheriger Kommentar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color=secondary @click="index++" v-if="index < commentsLength">
              nächster Kommentar
            </v-btn>
            <v-btn color=secondary v-else disabled="">
              nächster Kommentar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import chart1 from './chart1.vue';
import chart2 from './chart2.vue';

export default {
  components: {
    chart1,
    chart2
  },
  data() {
    return {
      id: this.$route.params.id,
      title: this.$route.params.title,
      question: '',
      selected: false,
      index: 0,
      commentsLength: 0,
      gotData: false
    };
  },

  // get avgMood and comments from the store
  created() {
    this.$store
      .dispatch('retrieveFeedback', this.id)
      .then(response => {
        // console.log(this.$store.state.feedback);
        this.$store.commit('getAvgMood');
        this.gotData = true;
        this.$store.commit('getComments');
        this.commentsLength = this.comments.length - 1;
        this.index = this.commentsLength;
      })
      .catch(error => alert(error));
  },

  methods: {
    // if a question selected, get its avgRating
    change: function() {
      this.$store.commit('getAvgRating', this.questions.indexOf(this.question));
      this.selected = true;
    }
  },

  computed: {
    questions() {
      return this.$store.state.questions;
    },
    weeks() {
      return this.$store.state.weeks;
    },
    avgRating() {
      return this.$store.state.avgRating;
    },
    comments() {
      return this.$store.state.comments;
    },
    avgMood() {
      return this.$store.state.avgMood;
    }
  }
};
</script>

<style scoped>
</style>
