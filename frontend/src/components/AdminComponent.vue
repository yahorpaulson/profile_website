<template>
    <div>
      <h1>Yahor Paulson — ADMIN</h1>
  
      <div class="instructions">
        <table>
          <tbody>
            <tr>
              <td>Change project</td>
              <td><button @click="showTextarea">Change</button></td>
            </tr>
            <tr>
              <td>Add project</td>
              <td><button>Add</button></td>
            </tr>
            <tr>
              <td>Delete project</td>
              <td><button>Delete</button></td>
            </tr>
          </tbody>
        </table>



        <div class = "setField">
            <input v-show="inputProjectNameVisible"
            class="projectName" placeholder="Input the name of a project"></input>
            <textarea
                v-show="textareaVisible"
                class="inputField"
                placeholder="Type your project data here..."
            ></textarea>
        </div>

        <button class="submit" v-show="submitVisible">Submit</button>
    </div>
  
      


      
    </div>
  </template>
  
<script setup lang="ts">
    import { ref } from 'vue'
  
    const textareaVisible = ref(false)
    const inputProjectNameVisible = ref(false)
    const submitVisible = ref(false)
  
    function showTextarea() {
        textareaVisible.value = true
        inputProjectNameVisible.value = true
        submitVisible.value = true
    }
  </script>
  
  <style scoped>
  .instructions {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
  
  table {
    border-collapse: collapse;
  }
  
  td {
    padding: 8px 12px;
  }

  .setField{
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    width:fit-content;
    height: 20%;
    margin-left: 30px;
  }
  
    .inputField {
        margin: 40px;
        height: 200px;
        width: 400px;
    }

    .submit {
        display: flex;
        align-items: center;
        height: 3rem;
        width: 20rem;
        margin-left: 5rem;
    }
</style>
  