
<template>
  <div id="side-menu" class="side-menu" :class="{ visible: isVisible }">
    <ul>
      <li @click="changeLang('en')">EN</li>
      <li @click="changeLang('be')">BE</li>
      <li @click="changeLang('de')">DE</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
    import { changeLang } from '../modules/langStore';
    import { ref, onMounted, onUnmounted } from 'vue';

    const isVisible = ref(false);
    const mouse = { x: 0, y: 0 };

    function handleMouseMove(event: MouseEvent) {
        mouse.x = event.x;
        mouse.y = event.y;
        isVisible.value = mouse.x <= 80; 
        
    }

    onMounted(() => window.addEventListener('mousemove', handleMouseMove));
    onUnmounted(() => window.removeEventListener('mousemove', handleMouseMove));
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


    @media (max-width:600px) {

    }
</style>