<template>
  <v-container fluid fill-height>
    <v-layout row>
      <v-flex xs12 sm10 md10 offset-sm1>
        <v-card>
          <v-toolbar color=primary dark>
            <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->

            <v-toolbar-title>Statistik</v-toolbar-title>

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
                </v-card>
                <v-card>
                    <chart2></chart2>
                </v-card> -->
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
      dataset: []
    };
  },
  created() {
    // var date;
    this.getData.then(v => {
      console.log(v.data);
      console.log(this.getAvgMood);
      // this.getKW;
      this.getAvgMood;
    });
  },

  methods: {
    getWeek: function(createdAt) {
      var date = new Date(createdAt);
      date.setHours(0, 0, 0, 0);
      // Thursday in current week decides the year.
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
      // January 4 is always in week 1.
      var week1 = new Date(date.getFullYear(), 0, 4);
      // Adjust to Thursday in week 1 and count number of weeks from date to week1.
      return (
        1 +
        Math.round(
          ((date.getTime() - week1.getTime()) / 86400000 -
            3 +
            (week1.getDay() + 6) % 7) /
            7
        )
      );
    }
  },

  computed: {
    getAvgMood: function() {
      var sumMood = [];
      var oldWeek = 0;
      var newWeek = 0;
      var index = 0;
      var counter = 0;
      if (this.dataset != null) {
        oldWeek = this.getWeek(this.dataset[0].createdAt);
        newWeek = oldWeek;
        sumMood.push(0);
      }
      this.dataset.forEach(v => {
        newWeek = this.getWeek(v.createdAt);
        if (newWeek == oldWeek) {
          sumMood[index] += v.mood;
          counter++;
        } else {
          sumMood[index] /= counter;
          counter = 1;
          sumMood.push(v.mood);
          oldWeek = newWeek;
          index++;
        }
      });
      sumMood[index] /= counter;
      return sumMood;
    },
    // getKW: function() {
    //   this.dataset.forEach(v => {
    //     // var date = new Date(v.createdAt);
    //     console.log(this.getWeek(v.createdAt));
    //   });
    // },
    getData: function() {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common[
          'Authorization'
        ] = this.$store.state.token;
        axios
          .get('/project_groups/' + this.id + '/feedbacks')
          .then(v => {
            this.dataset = v.data;
            resolve(v);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
    }
  }
};
</script>

<style scoped>
</style>
