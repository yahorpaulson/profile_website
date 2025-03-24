<script setup lang="ts">
import GreetSection from './HomePageComponents/GreetSection.vue';
import AboutSection from './HomePageComponents/AboutSection.vue';
import ContactsSection from './HomePageComponents/ContactsSection.vue';
import ProjectsSection from './HomePageComponents/ProjectsSection.vue';
import { ref, onMounted } from 'vue';
import Particle from '../utils/Particle.ts';
import {changeLang} from '../modules/langStore.ts'



onMounted(()=>{ //lifecycle of vue
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;

    //mouse position
    const mouse: { x: number | null, y: number | null } = {
        x: null,
        y: null
    };

    window.addEventListener("mousemove", (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
        showSideMenu(); 
    });


    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Set canvas background color
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height); // fillRect(x, y, width, height)

    let particlesArray: Particle[] = [];


    function initParticles() {
        for(let i = 0; i < 100; i++){
            particlesArray.push(new Particle(canvas.width, canvas.height)); 
            particlesArray[i].draw(ctx);
            
        }
    }

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach((particle) => {
            particle.update(canvas.width, canvas.height);  
            particle.draw(ctx);
        });
        drawLineToCursor();
        drawLeftBorderLine();

        requestAnimationFrame(animate); // recursive function doesnt cause stack overflow
        
    }


    function drawLineToCursor(){
        particlesArray.forEach((particle) => {

            let distance = 0;
            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - particle.x;
                let dy = mouse.y - particle.y;
                distance = Math.sqrt(dx*dx + dy *dy);
                
            }
            const maxDistance = 100;
            if(distance < maxDistance){

                ctx.shadowBlur = 20;
                ctx.shadowColor = particle.color;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                if (mouse.x !== null && mouse.y !== null) {
                    ctx.lineTo(mouse.x, mouse.y);
                }
                ctx.strokeStyle = 'lime';
                ctx.stroke();
                ctx.shadowBlur = 0;
            }
        });
        
    }

    function drawLeftBorderLine(){
        if (mouse.x !== null && mouse.x < 300) {
            ctx.save(); 

            ctx.beginPath();
            ctx.moveTo(0, 0); 
            ctx.lineTo(0, canvas.height);

            ctx.lineWidth = 7;
            ctx.strokeStyle = 'lime';        
            ctx.shadowColor = 'lime';        
            ctx.shadowBlur = 30;                
            ctx.globalAlpha = 1;              

            ctx.stroke();

            ctx.restore(); 
        }
    }


    initParticles();
    animate();
    showSideMenu();

    function showSideMenu() {
        const menu = document.getElementById('side-menu');
        if (menu && mouse.x !== null && mouse.x <= 100) {
            menu.classList.add('visible');
        } else if (menu) {
            menu.classList.remove('visible');
        }
    }
})
</script>


<style lang="css" scoped>

@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
    *{
        font-family: 'Share Tech Mono', monospace;
    }

    canvas {
        position: fixed;
        top: 0;
        width: 100vw;
        min-height: 100vh;
        background-color: black;
        z-index: 0
    }
    .side-menu {
        position: fixed;
        top: 0;
        left: -200px;
        width: 200px;
        height: 100vh;
       
        color: white;
        z-index: 3;
        transition: left 0.3s ease;
        padding: 20px;
    }
    .side-menu.visible {
        left: 0;
        
    }

    ul {
        list-style-type: none;
    }
    li:hover{
        cursor: pointer;
    }
    
</style>

<template>

    <canvas id="canvas">
    </canvas>


    <div>
        <GreetSection/>
        <AboutSection />
        <ProjectsSection/>
        <ContactsSection/>
    </div>

    <div id="side-menu" class="side-menu">
        <ul>
            <li @click="changeLang('en')">EN</li>
            <li @click="changeLang('be')">BE</li>
            <li @click="changeLang('de')">DE</li>
        </ul>
    </div>
    
  

</template>
