<script setup lang="ts">
  import {t} from './../../modules/langStore'
</script>

<template>
    <div class="about-wrapper">
      <div class="info">
        <h1>{{ t.titles.home.about }}</h1>
        <p>{{ t.about.text }}</p>
      </div>
      <img src="./../../assets/FkXe0iXk.jpeg" height="200" class="profile-photo" />
    </div>
</template>

<style lang="css" scoped>
*{
    position: relative;

}
.about-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 30px;
  align-items: center;
  
}

.info {
  flex: 1;
  min-width: 300px;
  color: white;
  padding: 20px;
  line-height: 1.6;
  max-width: 700px;
}



.profile-photo {
  width: 150px;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 0 10px lime;
  margin-left: 15%;
  transition: 1s ease-in-out;
  
}


.profile-photo:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px 6px lime;
}

@media screen and (max-width:600px){
    .profile-photo{
        display: none;
    }
}



</style>


