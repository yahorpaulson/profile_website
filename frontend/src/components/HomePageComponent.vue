<script setup>
import GreetSection from './HomePageComponents/GreetSection.vue';
import AboutSection from './HomePageComponents/AboutSection.vue';
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
        drawLeftBorderLine();

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
                ctx.shadowBlur = 0;
            }
        });
    }

    function drawLeftBorderLine(){
        if (mouse.x < 100) {
        ctx.save(); 

        ctx.beginPath();
        ctx.moveTo(0, 0); 
        ctx.lineTo(0, canvas.height);

        ctx.lineWidth = 5;
        ctx.strokeStyle = 'lime';        
        ctx.shadowColor = 'lime';        
        ctx.shadowBlur = 30;                
        ctx.globalAlpha = 1000;              

        ctx.stroke();

        ctx.restore(); 
    }
    }

    initParticles();
    animate();

    
    
})
</script>


<style lang="css" scoped>

@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
    *{
        font-family: 'Share Tech Mono', monospace;
    }

    canvas {
        position: fixed;
        width: 100vw;
        min-height: 100vh;
        background-color: black;
        z-index: 0
    }
    
</style>

<template>

    <canvas id="canvas">
    </canvas>

    <div>
        <GreetSection/>
        <AboutSection />
    </div>
    
  

</template>
