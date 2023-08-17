<script lang="ts" >
import PlotForm from './PlotForm.vue';
 
export default{
props:{
 showPlotModal: Boolean,
//  createNewPlot:Function,
// value:Object
deleteFun:Function,
// updateFun:Function,
// plotData:Object,
},
components:{
PlotForm
},
data(){
  return{
    // internalValue:this.plotData
  }
},
// watch:{
//   internalValue(newValue){
//     this.$emit('input',newValue)
//   }
// }
}

</script>
<template>
  <Transition name="modal">
    <div v-if="showPlotModal" class="modal-mask">
      <div class="modal-container">
        <!-- <div class="modal-header"> -->
          
          <!-- <slot name="header">Create new plot</slot> -->
        <!-- </div> -->
        <div class="modal-body">
         
            <slot name="body">
        <PlotForm  :deleteFun="deleteFun" />
        <button
              class="modal-default-button"
              @click="$emit('close')"
            >Close</button>
   </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 40%;
  min-width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  color:rgb(71, 71, 76);
  background-color: whitesmoke;
border-radius:10px;
}

.modal-default-button{
    padding:5px 8px;
    border:2px solid rgb(71, 71, 76);
    background-color:whitesmoke;
    border-radius:10px;
    color :rgb(71, 71, 76);
    font-size: 1rem;
  }
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 10px 0;
  display: flex;
flex-direction: column;
justify-content: center;
}

.modal-default-button {
  float: right;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>