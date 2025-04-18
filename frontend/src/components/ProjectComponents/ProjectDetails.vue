<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import {ref} from 'vue';
    import { Project } from '../../../../shared/modules/project';
    import BackgroundCanvas from '../BackgroundCanvas.vue';
    import {lang} from '../../modules/langStore'
    import LanguageSwitcher from '../LanguageSwitcher.vue';
    import {t} from './../../modules/langStore' 


    const project = ref<Project | null>(null);

    const route = useRoute();


    onMounted(async () => {
        const slug = route.params.slug as string;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${encodeURIComponent(slug)}`);

            const data = await res.json();
            project.value = data;
        } catch (e) {
            console.error('Error loading project details:', e);
        }
    });

    
</script>
    

<template>
    <BackgroundCanvas/>
    <LanguageSwitcher/>

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
    .details-container{
        display: flex;
        flex-direction: column;
        
        color: white;
        position: relative;
        gap: 2rem;
        font-size: clamp(1rem, 1.5vw, 2.2rem);
        align-items: center;
        min-height: 100vh;
        max-width: 80%;
        margin: 5% auto;
        padding: 0 1rem;

        justify-content: center;

        
    }
    *{
        cursor: default;
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

    .desc {
        max-width: 100%;
        text-align: center;
    }

    
</style>