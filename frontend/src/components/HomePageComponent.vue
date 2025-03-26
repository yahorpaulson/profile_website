<script setup lang="ts">
    import GreetSection from './HomePageComponents/GreetSection.vue';
    import AboutSection from './HomePageComponents/AboutSection.vue';
    import ContactsSection from './HomePageComponents/ContactsSection.vue';
    import ProjectsSection from './HomePageComponents/ProjectsSection.vue';
    import ParticleBackground from '../components/BackgroundCanvas.vue'
</script>



<template>
    <ParticleBackground/>

    <div>
        <GreetSection/>
        <AboutSection />
        <ProjectsSection/>
        <ContactsSection/>
    </div>

</template>
