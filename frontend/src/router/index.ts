import { createRouter, createWebHistory } from 'vue-router';
import HomePageComponent from '../components/HomePageComponent.vue';
import ProjectDetails from '../components/ProjectComponents/ProjectDetails.vue';

const routes = [
    { path: '/', component: HomePageComponent },
    {
        path: '/projects/:slug',
        name: 'projectDetails',
        component: ProjectDetails
    }
];

function generateSlug(title: string): string {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router;
