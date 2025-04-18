<script setup lang="ts">
  import {t} from './../../modules/langStore'
</script>

<template>
    <div class="about-wrapper">
      <div class="info">
        <h1>{{ t.titles.home.about }}</h1>
        <p>{{ t.about.text }}</p>
      </div>
      <img src="./../../assets/profile_photo.png" class="profile-photo" />
    </div>
</template>

<style lang="css" scoped>
.about-wrapper {
  display: grid;
  grid-template-columns: auto auto auto;

  align-items: center;
  min-height: 100vh;
  max-width:95%;
  gap: clamp(2rem, 8vw, 30rem);
  
  justify-content: center;
}
  

.info {
  color: white;
  font-size: clamp(1rem, 1.2vw, 2rem);
  line-height: 1.6;
  max-width: 1500px;
  justify-self: center;
  margin-left:20%;
  justify-self: center;
  
}



.profile-photo {
  width: clamp(150px, 15vw, 280px);
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 0 10px lime;
  transition: 0.3s ease-in-out;
  
}

.profile-photo:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px 6px lime;
}

@media screen and (max-width: 768px) {
  .about-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
  }

  .info {
    text-align: center;
    margin-left: 0;        
    justify-self: unset;      
    align-self: center;     
    max-width: 90%;
  }

  .profile-photo {
    display: none;
  }
}


</style>


