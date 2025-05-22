<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import {ref} from 'vue';
    import { Project } from '../../../../shared/modules/project';
    import ScrollComponent from '../ThreeComponents/ScrollComponent.vue';
    import {lang} from '../../modules/langStore'
    import LanguageSwitcher from '../LanguageSwitcher.vue';
    import {t} from './../../modules/langStore' 



    const project = ref<Project | null>(null);

    const route = useRoute();
    const router = useRouter();


    onMounted(async () => {
        const slug = route.params.slug as string;
        
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${encodeURIComponent(slug)}`);

            const data = await res.json();
            project.value = data;
            console.log(JSON.stringify(project.value));
        } catch (e) {
            console.error('Error loading project details:', e);
        }
    });

        
    function transfer(){
        router.back();
    }

    
</script>
    

<template>
    <ScrollComponent/>
    
    <LanguageSwitcher/>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Genos:ital,wght@0,100..900;1,100..900&family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poiret+One&display=swap" rel="stylesheet">

    <div class="return">
        <button @click="transfer()">←</button>
            
    </div>

    <div class="details-container">
        <h1>{{ project?.title[lang] }}</h1>


        <div class="desc">
            {{ project?.description[lang] }}
        </div>

        <div class="goals" v-if="project?.goals?.[lang]?.length">
            <strong>{{ t.titles.project.goals }}</strong>
            <ul>
                <li v-for="(item, index) in project.goals?.[lang]" :key="index">{{ item }}</li>
            </ul>
        </div>


        

        <div class="insights" v-if="project?.insights?.[lang]?.length">
            <strong>{{ t.titles.project.insights }}</strong>
            <ul>
                <li v-for="(item, index) in project?.insights?.[lang]" :key="index">{{ item }}</li>
            </ul>
        </div>


        

        <div class="tags" v-if="project?.tags?.length">
            <strong>{{ t.titles.project.tags }}</strong>
            <ul>
                <li v-for="(tag, index) in project.tags" :key="index">{{ tag }}</li>
            </ul>
        </div>




    </div>

</template>


<style scoped>
    *{
        font-family: 'Manrope', sans-serif;
        font-family: "IBM Plex Sans", sans-serif;
        font-optical-sizing: auto;
        font-style: normal;
        font-variation-settings:
        "wdth" 100;
    }
    .details-container{
        display: flex;
        flex-direction: column;
        
        color: white;
        gap: 2rem;
        font-size: clamp(1rem, 1.5vw, 2.2rem);
        align-items: center;
        height: 100%;
        width: clamp(60px, 80vw, 1000px);
        justify-content: center;
        text-align: center;
        margin: 0 auto;
        margin-top: 5%;
        z-index: 1;
        position: relative;

    }
    
    .tags li,
    .insights li,
    .goals li {
        cursor: default !important;
    }
    .tags{
        display: flex;
        flex-direction: row;
    }
    .return{
        
        background-color: transparent;
        
        width: clamp(3rem, 10vw,  10rem);
        height: clamp(1rem, 2.2vw,  6rem);
        position: relative;
        left: 80%;
        
    }
    .return > button{
        color: white;
        background-color: transparent;
        border: none;
        width: 100%;
        height:100%;
        font-size:clamp(3rem, 5vw,  10rem);
        cursor: pointer;
    }
    ul {
        list-style: none;
        padding-left: 0;
    }


    
</style>