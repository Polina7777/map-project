<script>
import Map from '../components/Map.vue'; 
import SubmitModal from '../components/SubmitModal.vue';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { ref } from 'vue'

export default {
  data() {
      return {
       map: null,
       draw:null,
       title:'',
       level:'',
       pointSet:'',
      showSubmitModal: ref(false),
      plotCoordinates:null,
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
    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      }
    });

    // this.map.on('click',this.addMarker);
    this.map.addControl(this.draw);
    //  this.map.on('draw.create', this.handleDrawCreate);
       this.map.on('draw.create', this.createArea);
       this.map.on('draw.delete', this.deleteArea);
       this.map.on('draw.update', this.updateArea);

  },
    methods:{
async getAllPoints() {
      // this.loading = true
      // this.error = false
      try {
        this.plots = await plotsApi.getAllPlots()
      } catch (err) {
        console.log(err)
      // this.error = true
      } finally {
        this.loading = false
      }
    },
    async createNewPlots(level,points) {
      // this.loading = true
      // this.error = false
      try {
       const plotsAdd = await plotsApi.createNewPlot(level,points);
       console.log(plotsAdd)
      } catch (err) {
        console.log(err)
      // this.error = true
      } finally {
        this.loading = false
      }
    },
  addMarker(event){
    const point = new mapboxgl.Marker().setLngLat(event.lngLat).addTo(this.map);
    // console.log(JSON.stringify(event.lngLat))
    const pointSet =[ event.lngLat.lng, event.lngLat.lat];
    // this.points.push(point);
    // this.createNewPlots(1,pointSet) 
  },
//   addPolygon(){
// const polygon = new mapboxgl.Polygon({
//   type: 'Feature',
//   geometry: {
//     type: 'Polygon',
//     coordinates: [this.plotCoordinates]
//   }
// });
// console.log(polygon)
// // new mapboxgl.Marker(polygon).addTo(map);
//   },
  drawPolygon(points) {
        this.map.addLayer({
            'id': 'maine',
            'type': 'fill',
            'source': {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Polygon',
                        'coordinates': points
                    }
                }
            },
            'layout': {},
            'paint': {
                'fill-color': '#088',
                'fill-opacity': 0.3
            }
        });
    },

  handleDrawCreate(event) {
      this.plotCoordinates = event.features[0].geometry.coordinates;
      // if(this.plotCoordinates.length){
      //  this.showSubmitModal = true
      // }
      console.log('Координаты участка:', this.plotCoordinates);
     // this.addPolygon(this.plotCoordinates)
      // return plotCoordinates
    },
    createArea(e) {
          let data = this.draw.getAll();
          const polygonData = data.features[0].geometry.coordinates;
              if(polygonData.length){
       this.showSubmitModal = true
      }
         // this.drawPolygon(polygonData);
          
    },
    deleteArea(e) {
         let data = this.draw.getAll();
         this.map.removeLayer('maine').removeSource('maine');
    },
    updateArea(e) {
          let data = this.draw.getAll();
          this.map.removeLayer('maine').removeSource('maine');
          const polygonData = data.features[0].geometry.coordinates;
          this.drawPolygon(polygonData);
          this.polygonDataCalc(data);
    }
  
    
},

  components: {
    Map,
    SubmitModal
}
};
</script>


<template>
    <div>
      <h1>Карта</h1>
      <!-- <button id="show-modal" @click="showSubmitModal = true">Show Modal</button> -->
    <Teleport to="body">
    <SubmitModal :showSubmitModal="showSubmitModal" @close="showSubmitModal = false" :plotCoordinates="plotCoordinates" :title="title" :level="level" :pointSet="pointSet" />
  </Teleport> 
      <Map :createNewPlots="createNewPlots" :addMarker="addMarker" :addPolygon="addPolygon" :handleDrawCreate="handleDrawCreate"/>
    </div>
  </template>
  
