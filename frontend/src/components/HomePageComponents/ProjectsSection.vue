<script setup lang="ts">
    import {t} from './../../modules/langStore'
    import { Project} from '../../../../shared/modules/project'
    import { computed } from 'vue';

    const projects = computed<Project[]>(() => {
    const raw = t.value.projects.project;

    if (Array.isArray(raw)) {
        return raw.map(p => ({
            ...p,
            slug: generateSlug(p.title)
        }));} 
        else {
            console.error("Expected an array of projects, got:", raw);
            return [];
        }
    });

    function generateSlug(title: string): string {
        return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }




    
</script>


<template>
    <div class="projects-wrapper">
        <h1 class="titleProjects">{{ t.projects.title  }}</h1>

        <div class="cards-wrapper">
            <div class="project" 
                v-for="project in projects">

                
                <h2>{{ project.title }}</h2>
                <a class="github-icon" v-if="project.link"
                    :href="project.link" target="{{ project.link }}">
                    &lt;/&gt;
                </a>

                

                <div>{{ project.description }}</div>
               
            </div>
            
        </div>
    </div>
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

</style>