<script setup lang="ts">
    import GreetSection from './HomePageComponents/GreetSection.vue';
    import AboutSection from './HomePageComponents/AboutSection.vue';
    import ContactsSection from './HomePageComponents/ContactsSection.vue';
    import ProjectsSection from './HomePageComponents/ProjectsSection.vue';
    import ParticleBackground from '../components/BackgroundCanvas.vue'
    import LanguageSwitcher from './LanguageSwitcher.vue';
</script>



<template>
    <ParticleBackground/>
    <LanguageSwitcher/>

    
    <div class="greet"> <GreetSection /></div>
    <div class="about"><AboutSection /></div>
    <div class="projects"><ProjectsSection /></div>
    <div class="contacts"><ContactsSection /></div>
    

    <footer class="footer">
  ©     {{ new Date().getFullYear() }} Yahor Paulson. All rights reserved.
    </footer>

</template>



    
    

<style>

    .about{
        margin-bottom: 20%;
    }
    
    
    .footer {
        text-align: center;
        color: lime;
        font-size: 0.9rem;
        font-family: 'VT323', monospace;
        text-shadow: 0 0 8px lime;
        margin-bottom: 2%;
    }


</style>