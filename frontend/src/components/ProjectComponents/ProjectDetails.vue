<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import {ref} from 'vue';
    import { Project } from '../../../../shared/modules/project';
    import BackgroundCanvas from '../BackgroundCanvas.vue';
    import {changeLang} from '../../modules/langStore'


    const project = ref<Project | null>(null);

    const route = useRoute();


    onMounted(async () => {
        const slug = route.params.slug as string;
        try {
            const res = await fetch(`http://localhost:3000/api/projects/${encodeURIComponent(slug)}`);
            const data = await res.json();
            project.value = data;
        } catch (e) {
            console.error('Error loading project details:', e);
        }
    });

    
</script>
    

<template>
    <BackgroundCanvas/>

    <div class="details-container">
        <h1>{{ project?.title }}</h1>


        <div class="desc">
            {{ project?.description }}
        </div>

        <div class="goals" v-if="project?.goals?.length">
            <strong>Goals:</strong>
            <ul>
                <li v-for="(item, index) in project.goals" :key="index">{{ item }}</li>
            </ul>
        </div>

        

        <div class="insights" v-if="project?.insights">
            <strong>Insights:</strong>
            <ul>
                <li v-for="(item, index) in project.insights" :key="index">{{ item }}</li>
            </ul>
        </div>


        

        <div class="tags" v-if="project?.tags?.length">
            <strong>Tags:</strong>
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
        align-items: center;
        padding: 10%;
        gap: 20px;
        
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

    
</style>