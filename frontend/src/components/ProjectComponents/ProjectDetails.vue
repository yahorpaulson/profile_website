<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import {ref} from 'vue';
    import { Project } from '../../../../shared/modules/project';
    import BackgroundCanvas from '../BackgroundCanvas.vue';


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

        

        <div class="insights">
            {{ project?.insights }}
        </div>

        <div class="goals">
            {{ project?.goals }}
        </div>

        <div class="tags">
            {{ project?.tags }}
        </div>



    </div>

</template>