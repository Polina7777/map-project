<script lang="ts">
import useValidate from "@vuelidate/core";
import {
  required,
  alpha,
  email,
  numeric,
  minLength,
} from "@vuelidate/validators";
import { ref } from "vue";
import { updatePlot } from "../../api-requests/plots-api";

export default {
  props: {
    // createNewPlot: Function,
    // close:Boolean,
    // internalValue: Object,
    deleteFun:Function,
// updateFun:Function,
    // value: Object,
    // map:Object,
  },
  data() {
    return {
      v$: useValidate(),
      //  title:this.title,
      //  level:this.level,
      //  pointsSet:this.pointSet,
      errMsg: ref<string>(),
      rules: {
        // title: { required,alpha},
        // level:{required,numeric}
      },
      error: ref<boolean>(),
    };
  },
  methods: {
    // async submit() {
    //   const isFormCorrect = await this.v$.$validate();
    //   if (isFormCorrect) {
    //     this.map.on('style.load',this.createNewPlot())
    //     // this.createNewPlot();
    //     // close()
    //     //   this.$router.push('/')
    //   } else {
    //     alert("Form failed validation");
    //   }
    // },
    // updateValue(inputName, newValue) {
    //   // const updatedValue = { ...this.plotData, [inputName]: newValue };
    //   const updatedValue = { ...this.value, [inputName]: newValue };
    //   this.$emit("input", updatedValue);
    // },
    // delete(){

    // },
    // update(){

    // }
  },
//   validations() {
//     return {
//       // title: { required,alpha,$autoDirty: true,$lazy: true},
//       // level:{required,numeric,$autoDirty: true,$lazy: true}
//     };
//   },
};
</script>

<template>
  <!-- <div class="inputs__wrapper">

    <input
      class="input"
      type="text"
      placeholder="Title"
      v-model="internalValue.title"
    />
    <input
      class="input"
      type="text"
      placeholder="Level"
      v-model="internalValue.level"
    />
    <input class="input" type="text" v-model="internalValue.plotCoordinates" />
  </div>
  <button class="submit_button" @click="submit">Submit</button> -->
  <h2>Delete?</h2>
  <button class="delete_button" @click="deleteFun">Ok</button> 
  <!-- <button class="update_button" @click="updateFun">Update</button>  -->
</template>
<style scoped>
.inputs__wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  color: rgb(71, 71, 76);
  padding-bottom: 30px;
}
h2 {
  font-size: 1rem;
}
.input {
  display: flex;
  flex-direction: column;
  color: rgb(71, 71, 76);
  width: 100%;
  border: 2px solid rgb(64, 64, 69);
  background-color: transparent;
  border-radius: 10px;
  margin: 10px 0;
  padding: 10px;
  outline: none;
  flex-wrap: wrap;
}

.delete_button, .update_button {
  padding: 5px 8px;
  border: 2px solid rgb(64, 64, 69);
  background-color: whitesmoke;
  border-radius: 10px;
  color: rgb(71, 71, 76);
  font-size: 1rem;
  align-items: center;
}
.error {
  font-size: 0.7rem;
  color: rgb(176, 9, 9);
}
</style>
