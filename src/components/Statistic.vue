<template>
  <v-container fluid fill-height>
    <v-layout row>
      <v-flex xs12 sm10 md10 offset-sm1>
        <v-card>
          <v-toolbar color=primary dark>
            <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->

            <v-toolbar-title>Statistiken des Projekts {{ title }}</v-toolbar-title>

            <v-spacer></v-spacer>
            <!-- <v-btn color=secondary @click="logout">
                            Logout
                        </v-btn> -->
            <v-btn icon to="/">
              <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
        <v-card>
          <v-card-title>
            <v-select v-model="question" :items="questions" @change="change" label="Wähle eine Frage aus" outline></v-select>
          </v-card-title>
          <!-- <chart1></chart1> -->
        </v-card>
        <v-card v-if="selected">
          <chart1 :weeks="weeks" :avgRating="avgRating" :key="question">
          </chart1>
        </v-card>
        <v-card>
          <chart2>
          </chart2>
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
      selected: false
    };
  },
  created() {
    this.$store
      .dispatch('retrieveFeedback', this.id)
      .then(response => {
        // console.log(this.$store.state.feedback);
        this.$store.commit('getAvgMood');

        console.log(this.$store.state.weeks);
      })
      .catch(error => alert(error));
  },

  methods: {
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
    }
  }
};
</script>

<style scoped>
</style>
