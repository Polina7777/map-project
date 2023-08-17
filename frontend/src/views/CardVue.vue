<script>
import Map from "../components/Map.vue";
import SubmitModal from "../components/SubmitModal.vue";
import PlotModal from "../components/PlotModal.vue";
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
      showSubmitModal: ref(false),
      showPlotModal: ref(false),
      clickedFeature: null,
      // plotCoordinates: null,
      plots: [],
      plotsArr: [],
      plotData: {
        title: "",
        level: "",
        plotCoordinates: null,
      },
    };
  },
  //   watch:{
  //     plots:{
  //       handler(newPlots){
  // this.updateMap()
  //       },immediate:true
  //     }
  //   },
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
    this.getAllPlots();
    this.map.addControl(this.draw);
    this.map.on("style.load", this.handleMapStyleLoad);
    // this.map.on("draw.create", this.createArea);
    // this.map.on("draw.delete", this.deleteArea);
    // this.map.on("draw.update", this.updateArea);
  },
  methods: {
    handleMapStyleLoad() {
      this.map.on("draw.create", this.createArea);
      this.map.on("draw.delete", this.deleteArea);
      this.map.on("draw.update", this.updateArea);
      // this.map.on("click", this.clickPlot);
      //   this.plots.forEach(plot => {
      //       const sourceId = `plots-source-${plot.id}`;
      //       const layerId = `plots-layer-${plot.id}`;

      //       this.map.on('click', layerId, (e) => {

      //   const features = this.map.queryRenderedFeatures(e.point, {
      //     layers: [layerId]
      //   });
      //   console.log(features)
      //   if (features.length > 0) {

      //     const clickedFeature = features[0]; // Информация о кликнутом участке
      //     console.log(clickedFeature);
      //   }
      // });
      //   })
    },
    async getAllPlots() {
      try {
        this.plots = await plotsApi.getAllPlots();
        this.plots.map((item, index) => {
          this.addPolygons(item);
        });
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
        console.log(plotsAdd.data.id)
        const sourceId = `plots-source-${plotsAdd.data.id}`;
      const layerId = `plots-layer-${plotsAdd.data.id}`;
         this.drawPolygon(this.plotData.plotCoordinates,layerId,sourceId);
        this.showSubmitModal = false;
      } catch (err) {
        console.log(err);
        // this.error = true
      } finally {
        this.loading = false;
         this.plotData.plotCoordinates = null
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
    drawPolygon(plotCoordinates,layerId,sourceId) {
      this.map.addLayer({
        id: layerId,
        type: "fill",
        source: sourceId,
        // id: 'maine',
        // id: this.plotData.title,
        // type: "fill",
          source: {
          type: "geojson",
          data: {
             type: "Feature",
            geometry: {
              type: "Polygon",
              // coordinates: points,
              coordinates:plotCoordinates
            },
          },
         },
        // layout: {},
        paint: {
          // "fill-color": "#088",
          // "fill-opacity": 0.3,
          "fill-color": "rgba(0, 0, 255, 0.5)", // Цвет заливки
          "fill-outline-color": "blue", // Цвет обводки
        },
      });
      this.map.addSource(sourceId, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: plotCoordinates, // Координаты участка
          },
        },
      });
    },
    addPolygons(item) {
      const sourceId = `plots-source-${item.id}`;
      const layerId = `plots-layer-${item.id}`;
      // this.map.addLayer({
      //   // id: 'maine',
      //   id: layerId,
      //   type: "fill",
      //   source: {
      //     type: "geojson",
      //     data: {
      //       type: "Feature",
      //       geometry: {
      //         type: "Polygon",
      //         // coordinates: points,
      //         coordinates:item.attributes.point_set
      //       },
      //     },
      //   },
      //   layout: {},
      //   paint: {
      //     "fill-color": "#088",
      //     "fill-opacity": 0.3,
      //   },
      // });
      // this.plots.forEach(plot => {
      //   const sourceId = `plots-source-${plot.id}`;
      //   const layerId = `plots-layer-${plot.id}`;

      this.map.addSource(sourceId, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: item.attributes.point_set, // Координаты участка
          },
        },
      });

      this.map.addLayer({
        id: layerId,
        type: "fill",
        source: sourceId,
        paint: {
          "fill-color": "rgba(0, 0, 255, 0.5)", // Цвет заливки
          "fill-outline-color": "blue", // Цвет обводки
        },
      });
      this.map.on("click", layerId, (e) => {
        console.log(e)
        const features = this.map.queryRenderedFeatures(e.point, {
          layers: [layerId],
        });
        if (features.length > 0) {
          this.clickedFeature = features[0];
          const clickedFeature = features[0]; // Информация о кликнутом участке
          this.showPlotModal = true;
          console.log(clickedFeature);
        }
      //   this.map.getSource('plot-source').setData({
      //   type:'FeatureCollection',
      //   features: updatedFeatures
      // })
      });
   
      // })
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
    console.log(this.draw.getAll())
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
     //  this.drawPolygon(this.plotData.plotCoordinates);
    },
    async deleteArea() {
      // let data = this.draw.getAll();
      const str = this.clickedFeature.layer.id;
      const plotBackendId = str.replace(/\D/g, "");
      this.map
        .removeLayer(this.clickedFeature.layer.id)
        .removeSource(this.clickedFeature.layer.source);
      const deletedPlot = await plotsApi.deletePlotById(plotBackendId);
      this.showPlotModal = false;
    },
    // async updateArea(e) {
    //   let data = this.draw.getAll();
    //   const str = this.clickedFeature.layer.id;
    //   const plotBackendId = str.replace(/\D/g, "");
    //   this.map
    //     .removeLayer(this.clickedFeature.layer.id)
    //     .removeSource(this.clickedFeature.layer.source);
    //   const polygonData = data.features[0].geometry.coordinates;
    //   this.plotData.plotCoordinates = polygonData;
    //   if (this.plotData.plotCoordinates.length) {
    //     // this.plotData.title = "";
    //     // this.plotData.level = "";
    //     this.showSubmitModal = true;
    //   }
    //   // this.showPlotModal = false;
    //   // this.drawPolygon(polygonData,this.clickedFeature.layer.id);
    //   const updatedPlot = await plotsApi.updatePlot(plotBackendId,polygonData);
    //   // this.polygonDataCalc(data);
    // },
//     async updateArea(e){
//       let data = this.draw.getAll();
//       const str = this.clickedFeature.layer.id;
//       const plotBackendId = str.replace(/\D/g, "");
//       this.map.on('draw.update', (e) => {
//   const updatedFeature = e.features[0]; // Обновленная геометрия участка

//   // Ваши действия с обновленной геометрией, например, обновление данных в массиве участков
//   // Обновление слоя на карте
//   this.map.getSource(this.clickedFeature.layer.source).setData(updatedFeature.geometry);
//   const updatedPlot =  plotsApi.updatePlot(plotBackendId,updatedFeature.geometry);
// });
// // const updatedPlot = await plotsApi.updatePlot(plotBackendId,updatedFeature.geometry);
//     },

    clickPlot(e) {
      const features = this.map.queryRenderedFeatures();
      console.log(features)
      // const features = this.map.queryRenderedFeatures(e.point, {
      //     layers: [layerId],
      //   });
      //   if (features.length > 0) {
          this.showPlotModal = true;
       // }
     
    },

    //     updateMap() {
    //     if (this.map) {
    //       // Удаление всех слоев и источников карты
    //       this.map.getStyle().layers.forEach(layer => {
    //         if (layer.source && layer.source.startsWith('plots-source')) {
    //           this.map.removeLayer(layer.id);
    //           this.map.removeSource(layer.source);
    //         }
    //       });

    //       // Добавление участков на карту
    //       this.plots.forEach(plot => {
    //         const sourceId = `plots-source-${plot.id}`;
    //         const layerId = `plots-layer-${plot.id}`;

    //         this.map.addSource(sourceId, {
    //           type: 'geojson',
    //           data: {
    //             type: 'Feature',
    //             geometry: {
    //               type: 'Polygon',
    //               coordinates: plot.coordinates // Координаты участка
    //             }
    //           }
    //         });

    //         this.map.addLayer({
    //           id: layerId,
    //           type: 'fill',
    //           source: sourceId,
    //           paint: {
    //             'fill-color': 'rgba(0, 0, 255, 0.5)', // Цвет заливки
    //             'fill-outline-color': 'blue' // Цвет обводки
    //           }
    //         });
    // // Добавление обработчика события click
    // this.map.on('click', layerId, (e) => {
    //   const features = this.map.queryRenderedFeatures(e.point, {
    //     layers: [layerId]
    //   });
    //   console.log(features)
    //   if (features.length > 0) {

    //     const clickedFeature = features[0]; // Информация о кликнутом участке
    //     console.log(clickedFeature);
    //   }
    // });

    //       });

    //     }
    //   }
  },

  components: {
    Map,
    SubmitModal,
    PlotModal,
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
