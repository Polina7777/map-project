<script lang="ts">

export default {
  props: {
    deleteFun:Function,
  },
};
</script>

<template>
  <h2>Delete?</h2>
  <button class="delete_button" @click="deleteFun">Ok</button> 
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

.delete_button {
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
