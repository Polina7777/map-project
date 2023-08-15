<script lang="ts" >
import useValidate from '@vuelidate/core'
import { required,alpha,email,numeric,minLength} from '@vuelidate/validators'
import { ref } from 'vue'

export default {
  props: ['plotCoordinates','title','level','pointSet'],
  data () {
    return {
    v$: useValidate(),
     title:this.title,
     level:this.level,
     pointsSet:this.pointSet,
     errMsg: ref<string>(),
     rules:{
      title: { required,alpha},
      level:{required,numeric}

    },
    error:ref<boolean>()
    }
  },
  methods: {
  async submit() {
    const isFormCorrect = await this.v$.$validate()
    if (isFormCorrect) {
      this.login()
    //   this.$router.push('/')
    }else {
        alert('Form failed validation')
     }
    },


},
validations() {
    return {
      title: { required,alpha,$autoDirty: true,$lazy: true},
      level:{required,numeric,$autoDirty: true,$lazy: true}
  }
  },
}
</script>

<template>
    <div class="inputs__wrapper">
  <input class="input" type="text" placeholder="Title" v-model="title"> 
  <span class='error' v-if="v$.title.$error">
        {{ v$.title.$errors[0].$message }}
      </span>
  <input class="input" type="text" placeholder="Level" v-model="level"> 
  <span class='error' v-if="v$.level.$error">
        {{ v$.level.$errors[0].$message }}
      </span>
      <input class="input" type="text" v-model="pointsSet"> 
  <!-- <span class='error' v-if="v$.level.$error">
        {{ v$.level.$errors[0].$message }}
      </span> -->
</div>
<button class='submit_button' @click=submit>Submit</button>
</template>
<style scoped>
.inputs__wrapper {
    display: flex;
    align-items: center;
    flex-direction:column;
    justify-content:center;
    align-content: center;
    color:rgb(71, 71, 76);
    padding-bottom: 30px;
}
h2{
  font-size: 1rem;
}
.input{
  display: flex;
  flex-direction: column;
  color:rgb(71, 71, 76);
 width: 100%;
     border:2px solid rgb(64, 64, 69);
    background-color: transparent;
    border-radius:10px;
    margin:10px 0;
    padding: 10px;
    outline:none;
    flex-wrap: wrap; 
}

.submit_button{
    padding:5px 8px;
    border:2px solid rgb(64, 64, 69);
    background-color: whitesmoke;
    border-radius:10px;
    color:rgb(71, 71, 76);
    font-size: 1rem;
    align-items: center;
}
.error{
  font-size: 0.7rem;
  color:rgb(176, 9, 9)
}

  </style>