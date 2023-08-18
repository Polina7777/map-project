<script lang="ts">
export default {
  props: {
    createNewPlot: Function,
    internalValue: Object,
    map:Object,
  },
  methods: {
    async submit() {
        this.map.on('style.load',this.createNewPlot())
    },
    updateValue(inputName, newValue) {
      const updatedValue = { ...this.value, [inputName]: newValue };
      this.$emit("input", updatedValue);
    },
  },
};
</script>

<template>
  <div class="inputs__wrapper">

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
  <button class="submit_button" @click="submit">Submit</button>
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

.submit_button {
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
