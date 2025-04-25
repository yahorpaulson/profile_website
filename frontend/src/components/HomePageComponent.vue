<script setup lang="ts">
    import GreetSection from './HomePageComponents/GreetSection.vue';
    import AboutSection from './HomePageComponents/AboutSection.vue';
    import ContactsSection from './HomePageComponents/ContactsSection.vue';
    import ProjectsSection from './HomePageComponents/ProjectsSection.vue';
    import FeedbackSection from './HomePageComponents/FeedbackSection.vue';
    import SVSection from './HomePageComponents/SVSection.vue';
    
    import LanguageSwitcher from './LanguageSwitcher.vue';
    import ScrollComponent from './ThreeComponents/ScrollComponent.vue';
    
</script>



<template>
    <!--<ParticleBackground/>-->
    <LanguageSwitcher/>
    <ScrollComponent/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Genos:ital,wght@0,100..900;1,100..900&family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poiret+One&display=swap" rel="stylesheet">
    
    <div class="greet"> <GreetSection /></div>
    <div class="about"><AboutSection /></div>
    <div class="projects"><ProjectsSection /></div>
    <div class="sv"><SVSection/></div>
    <div class="feedback"><FeedbackSection /></div>
    <div class="contacts"><ContactsSection /></div>
    
    

    <footer class="footer">
  ©     {{ new Date().getFullYear() }} Yahor Paulson (Siarheyeu). All rights reserved.
    </footer>

</template>



    
    

<style>
    *{
        font-family: 'Manrope', sans-serif;
        font-family: "IBM Plex Sans", sans-serif;
        font-optical-sizing: auto;
        font-style: normal;
        font-variation-settings:
        "wdth" 100;
    }

    .about{
        margin-bottom: 20%;
    }

    
    
    
    .footer {
        text-align: center;
        color: lime;
        font-size: clamp(0.9rem, 1.2vw, 1.9rem);
        text-shadow: 0 0 8px lime;
        margin-bottom: 2%;
        z-index: 1;
        position: relative;
        
    }


</style>