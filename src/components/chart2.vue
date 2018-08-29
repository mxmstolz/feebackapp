<template>
  <canvas id="myChart"></canvas>
</template>

<script>
import { Bar, Line } from 'vue-chartjs';

export default {
  extends: Line,
  Bar,
  props: ['data', 'options'],
  computed: {
    weeks() {
      return this.$store.state.weeks;
    },
    avgMood() {
      return this.$store.state.avgMood;
    }
  },
  // data: {
  //   weeks: this.$store.state.weeks
  // },
  mounted() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels: this.weeks, //.slice(this.weeks.length - 10),
        datasets: [
          {
            label: 'Durchschnittszufriedenheit',
            // backgroundColor: 'rgb(255, 99, 132)',
            borderColor: '#00838F',
            data: this.avgMood //.slice(this.avgMood.length - 10)
          }
        ]
      },

      // Configuration options go here
      options: {
        title: {
          display: true,
          text: 'Stimmungsbarometer'
        },
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Kalenderwoche'
              }
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: '(0 : sehr unzufrieden  --  4 : sehr zufrieden)'
              },
              ticks: {
                max: 4,
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }
};
</script>

<style>
</style>
