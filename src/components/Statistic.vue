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
                <v-card>
                    <chart1></chart1>
                </v-card>
                <v-card>
                    <chart2></chart2>
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
      chartData: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        datasets: [
          {
            label: 'GitHub Commits',
            backgroundColor: '#f87979',
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          }
        ]
      },
      chartOption: { responsive: true, maintainAspectRatio: false }
    };
  },
  mounted() {}
};
</script>

<style scoped>
</style>
