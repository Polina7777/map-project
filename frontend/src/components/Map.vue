<script>
import mapboxgl from 'mapbox-gl';
import { watch } from 'vue';

export default {
  name: 'Map',
  data() {
    return {
      map: null
    };
  },
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1IjoicGFsaW5hNzc3NyIsImEiOiJjbGxiYTlyb2gwMXMxM2lxb2dxdWRwNmVmIn0.dRldwa4loILEulZbxhwxqA';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10', // выберите нужный стиль карты
      center:  [-87.661557, 41.893748], // начальные координаты
      zoom: 5 // начальный масштаб
    });
    this.map.on('click',this.addMarker);
  },

methods:{
//     eventFunction(event){
//     console.log('click')
// // map.on('click', (event) => {
//   // If the user clicked on one of your markers, get its information.
//   const features = map.queryRenderedFeatures(event.point, {
//     layers: ['YOUR_LAYER_NAME'] // replace with your layer name
//   });
//   if (!features.length) {
//     return;
//   }
//   const feature = features[0];

//   const popup = new mapboxgl.Popup({ offset: [0, -15] })
//   .setLngLat(feature.geometry.coordinates)
//   .setHTML(
//     `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
//   )
//   .addTo(map);
// // });
//   },

  addMarker(event){
    const marker = new mapboxgl.Marker().setLngLat(event.lngLat).addTo(this.map);
  }
}


};
</script>



<template>
    <div id="map" @click="eventFunction"></div>
  </template>
  

  
  <style scoped>
  #map {
    width: 90vw;
    height: 500px; /* Высота карты */
  }
  </style>