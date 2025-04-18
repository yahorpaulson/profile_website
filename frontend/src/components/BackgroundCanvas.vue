<script setup lang="ts">
    import { onMounted } from 'vue';
    import Particle from '../utils/Particle';
    

    onMounted(() => {
        const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d')!;
        const mouse = { x: null as number | null, y: null as number | null };

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let particlesArray: Particle[] = [];

        function initParticles() {
            for (let i = 0; i < 100; i++) {
                const p = new Particle(canvas.width, canvas.height);
                particlesArray.push(p);
                p.draw(ctx);
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesArray.forEach((particle) => {
                particle.update(canvas.width, canvas.height);
                particle.draw(ctx);
            });
            drawLineToCursor();
            drawLeftBorderLine();
            requestAnimationFrame(animate);
        }

        function drawLineToCursor() {

            particlesArray.forEach((particle) => {
                let distance = 0;
                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - particle.x;
                    let dy = mouse.y - particle.y;
                    distance = Math.sqrt(dx * dx + dy * dy);
                }

                const maxDistance = 100;
                if (distance < maxDistance) {
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

        function drawLeftBorderLine() {
            if(!isMobile) {
                if (mouse.x !== null && mouse.x < 150) {
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
            
        }

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        initParticles();
        animate();
        
    });

</script>

<template>

    <canvas id="canvas" class="background-canvas"></canvas>

</template>


<style lang="css">

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
        z-index: -1
    }
    

    ul {
        list-style-type: none;
    }
    li:hover{
        cursor: pointer;
    }

    @media (max-width: 600px) {
        
    }
    
</style>
