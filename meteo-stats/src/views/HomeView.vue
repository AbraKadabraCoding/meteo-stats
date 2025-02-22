<template>
  <div class="app">
    <!-- Navbar -->
    <nav class="navbar">
      <h1>Meteo Stats dashboard</h1>
    </nav>

    <!-- Conteúdo -->
    <div class="content">
      <div class="grid-dashboard">
        <lineChart :chartOptions="options" :series="series"></lineChart>
      </div>
      <div class="map-wrapper">
        <MapLibreMap @onNewMarkerCreated="onNewMarkerCreated" />
      </div>
    </div>
  </div>
</template>

<script>
import MapLibreMap from '@/components/map/mapComponent.vue'
import lineChart from '@/components/charts/lineChart.vue'
import { fetchMaxMinTemperature } from '@/services/temperature.js'

export default {
  name: 'HomeView',
  components: {
    MapLibreMap,
    lineChart,
  },
  methods: {
    onNewMarkerCreated(marker) {
      this.locationCoords = marker
    },
    getTemperatureMinMax() {
      const today = new Date().toISOString().split('T')[0]
      const tenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 10))
        .toISOString()
        .split('T')[0]
      fetchMaxMinTemperature(this.locationCoords, tenDaysAgo, today).then((data) => {
        this.series = [
          {
            type: 'line',
            name: 'Máxima',
            data: data.tempMax,
          },
          {
            type: 'line',
            name: 'Minima',
            data: data.tempMin,
          },
        ]
        this.options.xaxis.categories = data.time
      })
    },
  },
  data() {
    return {
      locationCoords: null,
      options: {
        title: {
          text: 'Temperatura minima e máxima',
        },
        chart: {
          id: 'vuechart-example',
        },
        xaxis: {
          categories: [],
        },
      },
      series: [
        {
          name: '',
          data: [],
        },
      ],
    }
  },
  watch: {
    locationCoords() {
      this.getTemperatureMinMax()
    },
  },
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body,
.app {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2c3e50;
  color: white;
  padding: 10px 20px;
  height: 60px;
  flex-shrink: 0;
}
.navbar h1 {
  margin: 0;
  font-size: 1.5rem;
}
.map-wrapper {
  flex: 1;
  overflow: hidden;
}
.grid-dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 2fr));
  grid-auto-rows: 3fr;
  gap: 20px;
  flex: 1;
  background-color: #f4f4f4;
  box-sizing: border-box;
  overflow: hidden;
  height: 100%;
}

.content {
  display: flex;
  flex: 1;
  gap: 10px;
  height: calc(100vh - 100px);
}
</style>
