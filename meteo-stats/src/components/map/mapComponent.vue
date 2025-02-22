<template>
  <div id="map"></div>
</template>

<script>
import 'maplibre-gl/dist/maplibre-gl.css'
import { Map, NavigationControl, Marker } from 'maplibre-gl'

export default {
  name: 'MapLibreMap',
  data() {
    return {
      map: null,
      defaultCenter: [139.767, 35.681],
    }
  },
  methods: {
    getUserLocation() {
      return new Promise((resolve) => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve([position.coords.longitude, position.coords.latitude])
            },
            (error) => {
              console.error('Erro ao obter localização:', error)
              resolve(this.defaultCenter)
            },
          )
        } else {
          console.warn('Geolocalização não suportada no navegador.')
          resolve(this.defaultCenter)
        }
      })
    },
    async initMap() {
      const userLocation = await this.getUserLocation()
      this.$emit('onNewMarkerCreated', { lng: userLocation[0], lat: userLocation[1] })
      let marker = null

      this.map = new Map({
        container: 'map',
        style: {
          version: 8,
          sources: {
            ARGISMAP: {
              type: 'raster',
              tiles: [
                'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
              ],
              tileSize: 256,
            },
          },
          layers: [
            {
              id: 'ARGISMAP',
              type: 'raster',
              source: 'ARGISMAP',
              minzoom: 0,
              maxzoom: 18,
            },
          ],
        },
        center: userLocation,
        zoom: 15,
        maxZoom: 18,
      })

      /** Navigation */
      this.map.addControl(new NavigationControl({ visualizePitch: true }))
      /** Marker */
      marker = new Marker().setLngLat(userLocation).addTo(this.map)
      /** Click */
      this.map.on('click', (e) => {
        marker.remove()
        marker = new Marker().setLngLat(e.lngLat).addTo(this.map)
        this.$emit('onNewMarkerCreated', e.lngLat)
      })
    },
  },
  mounted() {
    this.initMap()
  },
}
</script>

<style scoped>
#map {
  height: 100%;
}
</style>
