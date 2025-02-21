<template>
  <div class="grid-dashboard">
    <apexchart class="apexchart" type="line" :options="options" :series="series"></apexchart>

    <apexchart class="apexchart" type="bar" :options="options" :series="series"></apexchart>
    <apexchart
      class="apexchart"
      type="bar"
      :options="options"
      :series="series"
      style="grid-column: span 2"
    ></apexchart>
    <apexchart class="apexchart" type="bar" :options="options" :series="series"></apexchart>
    <apexchart class="apexchart" type="bar" :options="options" :series="series"></apexchart>
    <apexchart class="apexchart" type="bar" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {
        chart: {
          id: 'vuechart-example',
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        },
      },
      series: [
        {
          name: 'Series 1',
          data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        },
      ],
    }
  },
}
</script>
<style scoped>
.grid-dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 2fr));
  grid-auto-rows: 3fr;
  gap: 20px;
  width: 100%;
  padding: 10px;
  background-color: #f4f4f4;
  box-sizing: border-box;
  overflow: hidden;
}

/* Estilização dos gráficos dentro da grid */
.apexchart {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
}
</style>
