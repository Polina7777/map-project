<script>
import Map from "../components/Map.vue";
import SubmitModal from "../components/SubmitModal.vue";
import PlotModal from "../components/PlotModal.vue";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { plotsApi } from "../../api-requests/plots-api";
import { ref } from "vue";

export default {
  data() {
    return {
      map: null,
      draw: null,
      showSubmitModal: ref(false),
      showPlotModal: ref(false),
      clickedFeature: null,
      plots: [],
      plotsArr: [],
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
      style: "mapbox://styles/mapbox/streets-v10",
      center: [-87.661557, 41.893748], 
      zoom: 5,
    });
    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
    });
    this.getAllPlots();
    this.map.addControl(this.draw);
    this.map.on("style.load", this.handleMapStyleLoad);;
  },
  methods: {
    handleMapStyleLoad() {
      this.map.on("draw.create", this.createArea);
      this.map.on("draw.delete", this.deleteArea);
      this.map.on("draw.update", this.updateArea);
    },
    async getAllPlots() {
      try {
        this.plots = await plotsApi.getAllPlots();
        this.plots.map((item) => {
          this.addPolygons(item);
        });
      } catch (err) {
        console.log(err);
      } 
    },
    async createNewPlot() {
      try {
        const plotsAdd = await plotsApi.createNewPlot(
          this.plotData.title,
          this.plotData.level,
          this.plotData.plotCoordinates
        );
        const sourceId = `plots-source-${plotsAdd.data.id}`;
      const layerId = `plots-layer-${plotsAdd.data.id}`;
         this.drawPolygon(this.plotData.plotCoordinates,layerId,sourceId);
        this.showSubmitModal = false;
      } catch (err) {
        console.log(err);
      } finally {
         this.plotData.plotCoordinates = null
      }
    },
    addMarker(event) {
      const point = new mapboxgl.Marker()
        .setLngLat(event.lngLat)
        .addTo(this.map);
      const pointSet = [event.lngLat.lng, event.lngLat.lat];
    },
    drawPolygon(plotCoordinates,layerId,sourceId) {
      this.map.addLayer({
        id: layerId,
        type: "fill",
        source: sourceId,
          source: {
          type: "geojson",
          data: {
             type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates:plotCoordinates
            },
          },
         },
        paint: {
          "fill-color": "rgba(0, 0, 255, 0.5)", 
          "fill-outline-color": "blue",
        },
      });
      this.map.addSource(sourceId, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: plotCoordinates, 
          },
        },
      });
    },
    addPolygons(item) {
      const sourceId = `plots-source-${item.id}`;
      const layerId = `plots-layer-${item.id}`;
      this.map.addSource(sourceId, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: item.attributes.point_set,
          },
        },
      });

      this.map.addLayer({
        id: layerId,
        type: "fill",
        source: sourceId,
        paint: {
          "fill-color": "rgba(0, 0, 255, 0.5)", 
          "fill-outline-color": "blue",
        },
      });
      this.map.on("click", layerId, (e) => {
        console.log(e)
        const features = this.map.queryRenderedFeatures(e.point, {
          layers: [layerId],
        });
        if (features.length > 0) {
          this.clickedFeature = features[0];
          const clickedFeature = features[0]; 
          this.showPlotModal = true;
        }
      });
   
    },
    createArea() {
      let data = this.draw.getAll();
      data.features.map((item,index)=>{
        const polygonData = data.features[index].geometry.coordinates;
      if (polygonData.length) {
        this.plotData.title = "";
        this.plotData.level = "";
        this.plotData.plotCoordinates = polygonData;
       
      }
      })
      this.showSubmitModal = true;
    },
    async deleteArea() {
      const str = this.clickedFeature.layer.id;
      const plotBackendId = str.replace(/\D/g, "");
      this.map
        .removeLayer(this.clickedFeature.layer.id)
        .removeSource(this.clickedFeature.layer.source);
      const deletedPlot = await plotsApi.deletePlotById(plotBackendId);
      this.showPlotModal = false;
    },
    clickPlot() {
          this.showPlotModal = true;
    },
  },

  components: {
    Map,
    SubmitModal,
    PlotModal,
  },
};
</script>

<template>
  <div class="map_wrapper">
    <h1>Карта</h1>
    <Teleport to="body">
      <SubmitModal
        :showSubmitModal="showSubmitModal"
        @close="showSubmitModal = false"
        :createNewPlot="createNewPlot"
        :plotData="plotData"
        :map="this.map"
      />
    </Teleport>
    <Teleport to="body">
      <PlotModal
        :showPlotModal="showPlotModal"
        @close="showPlotModal = false"
        :createNewPlot="createNewPlot"
        :deleteFun="deleteArea"

 
      />
    </Teleport>
    <Map />
  </div>
</template>

<style scoped>
.map_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
