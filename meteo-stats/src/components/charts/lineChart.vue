<template>
  <div class="line-chart">
    <apexchart
      ref="lineChart"
      type="line"
      :title="title"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  name: 'LineChart',
  props: {
    chartOptions: Object,
    series: Array,
    title: String,
  },
  data() {
    return {
      locationCoords: null,
    }
  },
  watch: {
    'chartOptions.xaxis.categories': function (newCategories) {
      if (this.$refs.lineChart) {
        // Atualiza o gráfico com as novas categorias
        this.$refs.lineChart.updateOptions(
          {
            xaxis: {
              categories: newCategories,
            },
          },
          true,
        ) // A opção 'true' força a atualização completa
      }
    },
  },
}
</script>

<style></style>
