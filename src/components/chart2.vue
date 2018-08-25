<template>
  <canvas id="myChart"></canvas>
</template>

<script>
import { Bar, Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: ['data', 'options'],
  mounted() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels: this.$store.state.weeks,
        datasets: [
          {
            label: 'Durchschnittszufriedenheit',
            // backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(155, 99, 132)',
            data: this.$store.state.sumMood
          }
        ]
      },

      // Configuration options go here
      options: {}
    });
  }
};
</script>

<style>
</style>
