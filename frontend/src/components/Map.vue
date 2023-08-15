<script>
import mapboxgl from 'mapbox-gl';
import { plotsApi } from '../../api-requests/plots-api.ts';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { watch } from 'vue';

export default {
  name: 'Map',
  props: [
    'createNewPlots',
    'addMarker',
    'addPolygon',
    'handleDrawCreate',
   
  ],
  data() {
    return {
      map: null,
      draw:null,
      plots:[],
      points:[],
      level:'',
    };
  },
  // mounted() {
  //   mapboxgl.accessToken = 'pk.eyJ1IjoicGFsaW5hNzc3NyIsImEiOiJjbGxiYTlyb2gwMXMxM2lxb2dxdWRwNmVmIn0.dRldwa4loILEulZbxhwxqA';
  //   this.map = new mapboxgl.Map({
  //     container: 'map',
  //     style: 'mapbox://styles/mapbox/streets-v10', // выберите нужный стиль карты
  //     center:  [-87.661557, 41.893748], // начальные координаты
  //     zoom: 5 // начальный масштаб
  //   });
  //   this.draw = new MapboxDraw({
  //     displayControlsDefault: false,
  //     controls: {
  //       polygon: true,
  //       trash: true
  //     }
  //   });

  //   this.map.on('click',this.addMarker);
  //   this.map.addControl(this.draw);
  //    this.map.on('draw.create', this.handleDrawCreate);
  //    map.addControl(draw);
       
  //      map.on('draw.create', this.createArea);
  //      map.on('draw.delete', this.deleteArea);
  //      map.on('draw.update', this.updateArea);

  // },

// methods:{
// async getAllPoints() {
//       // this.loading = true
//       // this.error = false
//       try {
//         this.plots = await plotsApi.getAllPlots()
//       } catch (err) {
//         console.log(err)
//       // this.error = true
//       } finally {
//         this.loading = false
//       }
//     },
//     async createNewPlots(level,points) {
//       // this.loading = true
//       // this.error = false
//       try {
//        const plotsAdd = await plotsApi.createNewPlot(level,points);
//        console.log(plotsAdd)
//       } catch (err) {
//         console.log(err)
//       // this.error = true
//       } finally {
//         this.loading = false
//       }
//     },
//   addMarker(event){
//     const point = new mapboxgl.Marker().setLngLat(event.lngLat).addTo(this.map);
//     // console.log(JSON.stringify(event.lngLat))
//     const pointSet =[ event.lngLat.lng, event.lngLat.lat];
//     this.points.push(point);
//     // this.createNewPlots(1,pointSet) 
//   },
//   addPolygon(event){
// const polygon = new mapboxgl.Polygon({
//   type: 'Feature',
//   geometry: {
//     type: 'Polygon',
//     coordinates: [plotCoordinates]
//   }
// });
// console.log(polygon)
// new mapboxgl.Marker(polygon).addTo(map);
//   },
//   // drawPolygon(){
//   //   this.draw = new MapboxDraw({
//   //     displayControlsDefault: false,
//   //     controls: {
//   //       polygon: true,
//   //       trash: true
//   //     }
//   //   });
//   // },
//   handleDrawCreate(event) {
//       const plotCoordinates = event.features[0].geometry.coordinates;
//       console.log('Координаты участка:', plotCoordinates);
//     }
// }


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