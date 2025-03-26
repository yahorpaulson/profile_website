<script setup lang="ts">
    import { onMounted } from 'vue';
    import Particle from '../utils/Particle';
    import { changeLang } from '../modules/langStore';
    

    onMounted(() => {
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

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });

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
    });

</script>

<template>

    <canvas id="canvas" class="background-canvas"></canvas>


    <div id="side-menu" class="side-menu">
        <ul>
            <li @click="changeLang('en')">EN</li>
            <li @click="changeLang('be')">BE</li>
            <li @click="changeLang('de')">DE</li>
        </ul>
    </div>

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
