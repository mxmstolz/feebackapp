<template>
    <canvas id="myChart"></canvas>
</template>

<script>
import { Bar, Line } from 'vue-chartjs';

export default {
  extends: Line,
  Bar,
  props: ['weeks', 'avgRating'],
  computed: {},
  mounted() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels: this.weeks.slice(this.weeks.length - 10),
        datasets: [
          {
            label: 'Durchschnittsrating',
            // backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(155, 99, 132)',
            data: this.avgRating.slice(this.avgRating.length - 10)
          }
        ]
      },

      // Configuration options go here
      options: {
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
                labelString: 'Rating'
              },
              ticks: {
                max: 8,
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
