<template>


  <div class="language-switcher"></div>
  <div class="lang-text">{{ t.titles.switchLang }}</div>
  <div id="side-menu" class="side-menu" :class="{ visible: isVisible }">
    <ul>
      <li @click="changeLang('en')">EN</li>
      <li @click="changeLang('be')">BY</li>
      <li @click="changeLang('de')">DE</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
    
    import { ref, onMounted, onUnmounted } from 'vue';
    import { t,changeLang } from '../modules/langStore';

    const isVisible = ref(false);
    const mouse = { x: 0, y: 0 };
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); 


    function handleMouseMove(event: MouseEvent) {

      if(!isMobile) {
        mouse.x = event.x;
        mouse.y = event.y;
        isVisible.value = mouse.x <= 80; 
      }
        
    }

    function handleTouchStart(event: TouchEvent) {
        if (isMobile) {
          
          const touch = event.touches[0];
          mouse.x = touch.clientX;
          mouse.y = touch.clientY;

          if (
            mouse.x <=  window.innerWidth * 0.20 && 
            mouse.y <= window.innerHeight * 0.20
          ) { 
            isVisible.value = true;
            setTimeout(() => {
              isVisible.value = false;
            }, 4000);
          } else {
            isVisible.value = false;
          }
             
        }
    }

    onMounted(() => {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchstart', handleTouchStart);
    });
    onUnmounted(() => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart); 
    });
</script>

<style scoped>
  .side-menu {
      position: fixed;
      top: 0;
      left: -200px;
      width: 200px;
      height: 100vh;
      color: white;
      z-index: 3;
      transition: left 0.3s ease;
      padding: 20px;
  }
  .side-menu.visible {
    left: 0;
  }
  ul {
    list-style-type: none;
  }
  li:hover {
  cursor: pointer;
  }
  .language-switcher {
    display: none;
  }
  



  @media (max-width: 900px) {
    
    
    .lang-text {
      position: fixed;
      top: 10px;
      left: 10px;
      color: white;
      font-size: 1.5rem;
      text-shadow: 0 0 8px lime;
      z-index: 4;
      opacity: 0.5;
    }
    
    .language-switcher{
      display: flex;
      position: fixed;
      top: 10px;
      left: 10px;
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 10px;
      border-radius: 5px;
    }

    
    ul {
      padding: 0;
      
    }

    li {
      font-size: 1.6rem;
      margin-bottom: 24px;
      color: lime;
      transition: transform 0.2s ease, text-shadow 0.2s ease;
    }

    
  }

</style>