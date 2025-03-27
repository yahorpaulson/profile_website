<script setup lang="ts">
    import {t} from './../../modules/langStore'
    import { Project } from '../../../../shared/modules/project';
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { lang } from './../../modules/langStore';
    
    

    const projects = ref<Project[]>([]);


    

    
    const isLoading = ref(true);

    const router = useRouter();

    onMounted(async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`);
;
            const data = await response.json();
            projects.value = data;
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        } finally {
            isLoading.value = false;
        }

        
    });

    
    

    function titleToSlug(title: string): string {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }

    function projectDetailsTransfer(slug: string) {
        router.push({ path: `/projects/${slug}` });
    }
    
</script>


<template>
    
    <section class="projects-wrapper">
    
        <h1>{{t.titles.home.project}}</h1>
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

                <h3>{{ project.title[lang] }}</h3>

                <p>{{ project.shortDescription[lang] }}</p>
  
                <ul v-if="project.tags?.length">
                    <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
                </ul>
            </div>
      </div>
    </section>
  </template>
  
  



<style lang="css" scoped>
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
        font-size: 2rem; /* или 32px */
        font-weight: bold;
        margin-bottom: 1.5rem;
        text-align: center;
    }
    .cards-wrapper {
        display: flex;
        flex-wrap: wrap;
        
        justify-content: center;
        margin: 5%;
        
        
        
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
        
    }
    
    .project:hover{
        background-color: black;
        scale: 1.3;
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
        font-size: small;
    }

</style>