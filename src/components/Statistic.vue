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
        <!-- <v-card>
                    <chart1></chart1>
                </v-card> -->
        <v-card>
          <chart2 :options="{responsive: false, maintainAspectRatio: false}">
          </chart2>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import chart1 from './chart1';
import chart2 from './chart2.vue';

export default {
  components: {
    chart1,
    chart2
  },
  data() {
    return {
      id: this.$route.params.id,
      title: this.$route.params.title
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

  methods: {},

  computed: {}
};
</script>

<style scoped>
</style>
