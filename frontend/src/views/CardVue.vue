<script>
import Map from "../components/Map.vue";
import SubmitModal from "../components/SubmitModal.vue";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { plotsApi } from "../../api-requests/plots-api";
import { ref } from "vue";

export default {
//   created(){
// this.getAllPlots()
//   },
  data() {
    return {
      map: null,
      draw: null,
      // title: "",
      // level: "",
      // pointSet: "",
      showSubmitModal: ref(false),
      // plotCoordinates: null,
      plots:[],
      plotData: {
        title: "",
        level: "",
        plotCoordinates: null,
      },
    };
  },
  mounted() {

    mapboxgl.accessToken =
      "pk.eyJ1IjoicGFsaW5hNzc3NyIsImEiOiJjbGxiYTlyb2gwMXMxM2lxb2dxdWRwNmVmIn0.dRldwa4loILEulZbxhwxqA";
    this.map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v10", // выберите нужный стиль карты
      center: [-87.661557, 41.893748], // начальные координаты
      zoom: 5, // начальный масштаб
    });
    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
    });
    console.log(this.map)
    this.getAllPlots()
    // this.map.on('click',this.addMarker);
    this.map.addControl(this.draw);
    //  this.map.on('draw.create', this.handleDrawCreate);
    this.map.on('style.load',this.handleMapStyleLoad)
    // this.map.on("draw.create", this.createArea);
    // this.map.on("draw.delete", this.deleteArea);
    // this.map.on("draw.update", this.updateArea);
  },
  methods: {
handleMapStyleLoad(){
  this.map.on("draw.create", this.createArea);
    this.map.on("draw.delete", this.deleteArea);
    this.map.on("draw.update", this.updateArea);
},
    async getAllPlots() {
      // this.loading = true
      // this.error = false
      try {
        this.plots = await plotsApi.getAllPlots();
        this.plots.map((item,index)=>{
          this.addPolygons(item)
        })
      } catch (err) {
        console.log(err);
        // this.error = true
      } finally {
        this.loading = false;
      }
    },
    async createNewPlot() {
      try {
        const plotsAdd = await plotsApi.createNewPlot(
          this.plotData.title,
          this.plotData.level,
          this.plotData.plotCoordinates
        );
        this.drawPolygon(this.plotData.plotCoordinates);
        this.showSubmitModal=false;
      } catch (err) {
        console.log(err);
        // this.error = true
      } finally {
        this.loading = false;
      }

    },
    addMarker(event) {
      const point = new mapboxgl.Marker()
        .setLngLat(event.lngLat)
        .addTo(this.map);
      // console.log(JSON.stringify(event.lngLat))
      const pointSet = [event.lngLat.lng, event.lngLat.lat];
      // this.points.push(point);
      // this.createNewPlots(1,pointSet)
    },
    drawPolygon() {
      this.map.addLayer({
        // id: 'maine',
        id: this.plotData.title,
        type: "fill",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Polygon",
              // coordinates: points,
              coordinates:this.plotData.plotCoordinates
            },
          },
        },
        layout: {},
        paint: {
          "fill-color": "#088",
          "fill-opacity": 0.3,
        },
      });
    },
    addPolygons(item) {
      this.map.addLayer({
        // id: 'maine',
        id: item.attributes.title,
        type: "fill",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Polygon",
              // coordinates: points,
              coordinates:item.attributes.point_set
            },
          },
        },
        layout: {},
        paint: {
          "fill-color": "#088",
          "fill-opacity": 0.3,
        },
      });
    },


    // handleDrawCreate(event) {
    //   this.plotData.plotCoordinates = event.features[0].geometry.coordinates;
    //   // if(this.plotCoordinates.length){
    //   //  this.showSubmitModal = true
    //   // }
    //   console.log("Координаты участка:", this.plotData.plotCoordinates);
    //   // this.addPolygon(this.plotCoordinates)
    //   // return plotCoordinates
    // },
    createArea(e) {
      let data = this.draw.getAll();
      const polygonData = data.features[0].geometry.coordinates;
        this.plotData.plotCoordinates = polygonData;
        if(this.plotData.plotCoordinates.length){
          this.plotData.title = '';
          this.plotData.level='';
          this.showSubmitModal = true;
        }
    //  this.drawPolygon(polygonData);
    // this.drawPolygon(this.plotData.plotCoordinates);
    },
    deleteArea(e) {
      console.log('delete',e)
      let data = this.draw.getAll();
      console.log(data,'datadelete')
      // this.map.removeLayer('maine').removeSource('maine');
      this.map.removeLayer(this.plotData.title).removeSource(this.plotData.title);
    },
    updateArea(e) {
      console.log('update',e)
      let data = this.draw.getAll();
       console.log(data,'dataupdate',this.map)
      // this.map.removeLayer('maine').removeSource('maine');
      this.map.removeLayer(this.plotData.title).removeSource(this.plotData.title);
      const polygonData = data.features[0].geometry.coordinates;
      this.drawPolygon(polygonData,this.plotData.title);
   
      // this.polygonDataCalc(data);
    },

  },

  components: {
    Map,
    SubmitModal,
  },
};
</script>

<template>
  <div>
    <h1>Карта</h1>
    <!-- <button id="show-modal" @click="showSubmitModal = true">Show Modal</button> -->
    <Teleport to="body">
      <SubmitModal
        :showSubmitModal="showSubmitModal"
        @close="showSubmitModal = false"
        :createNewPlot="createNewPlot"
        :plotData = "plotData"
        :map="this.map"
      />
    </Teleport>
    <Map
  
    />
  </div>
</template>
<!-- :createNewPlot="createNewPlot"
:addMarker="addMarker"
:drawPolygon="drawPolygon" -->