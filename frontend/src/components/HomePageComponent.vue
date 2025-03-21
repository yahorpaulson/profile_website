<script setup>
import GreetSection from './HomePageComponents/GreetSection.vue';
import { onMounted } from 'vue';
import Particle from '../utils/Particle.ts';

onMounted(()=>{ //lifecycle of vue
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const mouse = {
        x: null,
        y: null
    }


    //mouse position
    window.addEventListener("mousemove", (event) =>{
        mouse.x = event.x;
        mouse.y = event.y;
    })


    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Set canvas background color
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height); // fillRect(x, y, width, height)

    let particlesArray= [];


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

        requestAnimationFrame(animate); // recursive function doesnt cause stack overflow
        
    }


    function drawLineToCursor(){
        particlesArray.forEach((particle) => {
            let dx = mouse.x - particle.x;
            let dy = mouse.y - particle.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 100;
            if(distance < maxDistance){

                ctx.shadowBlur = 20;
                ctx.shadowColor = particle.color;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = 'lime';
                ctx.stroke();
            }
        });
    }

    initParticles();
    animate();

    
    
})
</script>


<style lang="css" scoped>
canvas {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: black;}
</style>

<template>
    <canvas id="canvas"></canvas>
  <div>
    <GreetSection />
  </div>
</template>
