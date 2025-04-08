import { createRouter, createWebHistory } from 'vue-router';
import HomePageComponent from '../components/HomePageComponent.vue';
import ProjectDetails from '../components/ProjectComponents/ProjectDetails.vue'
import AdminComponent from '../components/AdminComponent.vue';

const routes = [
    { path: '/', component: HomePageComponent },
    { path: '/projects/:slug', component: ProjectDetails, props: true },
    { path: '/projects', redirect: '/' },
    { path: '/admin', component: AdminComponent }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router;
