<script setup lang="ts">
    import {t} from './../../modules/langStore'
    import { Project } from '../../../../shared/modules/project';
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { lang } from './../../modules/langStore';
    import { computed } from 'vue';

    

    const projects = ref<Project[]>([]);
    
    const isLoading = ref(true);

    const router = useRouter();

    const currentLang = computed(() => lang.value)

    onMounted(async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`);
            const data = await response.json();
            projects.value = data;
            

        } catch (error) {
            console.error('Failed to fetch projects:', error);
        } finally {
            isLoading.value = false;
        }

    });

   

    function projectDetailsTransfer(slug: string) {
        router.push({ path: `/projects/${slug}` });
    }
    
</script>


<template>
    
    <section class="projects-wrapper">
    
        <h1>{{t.titles.home.project}}</h1>


        <h1 v-if="isLoading" class="loading">Loading...Please wait..</h1>

        <div class="cards-wrapper" >
            <div
                class="project"
                v-for="project in projects"
                :key="project.slug" @click="projectDetailsTransfer(project.slug)"
                >
                <a
                    v-if="project.link"
                    :href="project.link"
                    target="_blank"
                    class="github-icon"
                    >&lt;/&gt;
                </a>
                <p v-if="project.inProgress" class="progress-title">in progress</p>

                <h3>{{ project.title?.[currentLang] || 'No title' }}</h3>

                <p>{{ project.shortDescription?.[currentLang] || 'No description' }}</p>

  
                <ul v-if="project.tags?.length">
                    <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
                </ul>
            </div>
      </div>
    </section>
</template>
  
  



<style lang="css" scoped>
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.2; }
    }

    
    @keyframes moveicon{
        0%{
            left: 0px;
        }
        50%{
            left: 40%;
        }
        100%{
            left: 0px;
            transform: rotateX(360deg);
        }
    }
    .projects-wrapper{
        display: flex;
        position: relative;
        flex-direction: column;
        color: white;
        align-items: center;
        flex-wrap: wrap;
        
    }
    .projects-wrapper h1 {
        font-size: clamp(2rem, 3vw, 5rem);
        font-weight: bold;
        margin-bottom: 1.5rem;
        text-align: center;
    }
    .cards-wrapper {
        display: flex;
        flex-wrap: wrap;
        
        justify-content: center;
        margin: 5%;
        max-width:90%
        
        
    }
    .project{
        flex: 0 0 calc(40%);
        overflow: hidden;
        position: relative;
        z-index: 1;
        border: 2px solid lime;
        display: flex;
        flex-direction: column;
        transition:  1.5s ease;
        border-radius: 2%;
        padding: 2%;
        margin: 1%;
        box-shadow: 0 0 10px 2px lime ;
        font-size: clamp(1rem, 1.2vw, 3rem);
        
    }
    
    .project:hover{
        background-color: black;
        scale: 1.1;
        z-index: 10;
        
    }
    .github-icon{
        color: white;
        text-decoration: none;
        position: relative;
        
        
    }
    .project:hover .github-icon {
        animation: moveicon 2s ease-in-out infinite;
        
    }
    li{
        font-size: clamp(1rem, 1.5vw, 1.8rem);
    }
    .loading {
        text-shadow: 0 0 10px  lime;
        animation: pulse 1.5s infinite ease-in-out;
    }
    .progress-title {
        color: white;
        position: relative;
        margin-left: auto;
        margin-right: 0;
        top: -3rem;
        display: block;
    }

</style>