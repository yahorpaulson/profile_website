<script setup lang="ts">
    import * as THREE from 'three';
    import { onMounted, ref } from 'vue';

    const count = 1200;
    const positions = new Float32Array(count * 3); // each vertex has 3 coordinates (x, y, z)

    const geometry = new THREE.BufferGeometry(); // create a buffer geometry#

    const canvas = ref<HTMLCanvasElement | null>(null); // reference to the canvas element


    const clock = new THREE.Clock();

    //we define coordinates of every vertex in the array
    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 100; // random value between -50 and 50
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)); // set the position attribute of the geometry
    //each of 3 values in the array is a coordinate of a vertex

    const material = new THREE.PointsMaterial({
        size: 1, // size of each point
        color: 0xffffff, 
        blending: THREE.AdditiveBlending, // blending mode
        sizeAttenuation: true,
        map: generateCircleTexture(), // texture for the points
        depthWrite: false,
    });


    const particles = new THREE.Points(geometry, material); // create particles
    
    

    const scene = new THREE.Scene()
    scene.add(particles); // add particles to the scene
    



    const camera = new THREE.PerspectiveCamera(
        30, // field of view(humans see 75 degrees), > is fisheye, < zoom
        window.innerWidth / window.innerHeight, // aspect ratio
        0.1, // near plane
        1000 // far plane
    )

    onMounted(() => {
       if(!canvas.value) return;

       const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas.value,
        antialias: true, // smooth edges
        alpha: true }); // transparent background

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio); // set pixel ratio to device pixel ratio for better quality

        camera.position.z = 70; // set camera position

        function animate(){
            requestAnimationFrame(animate)

            const delta = clock.getDelta(); // get time since last frame


            //use delta to make animation frame rate independent
            //different devices have different FPS
            particles.rotation.y += delta * 0.05; // rotate particles
            particles.rotation.x += delta * 0.01; // rotate particles

            

            renderer.render(scene, camera); // render the scene
        }


        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight; // update aspect ratio
            camera.updateProjectionMatrix(); // update projection matrix
            renderer.setSize(window.innerWidth, window.innerHeight); // update renderer size
        });

        


        animate(); // start animation
    });

    function generateCircleTexture(): THREE.Texture {
        const size = 128;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext('2d')!;
        const center = size / 2;

        const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(0.2, 'grey');
        gradient.addColorStop(0.6, 'rgba(255,255,255,0.1)');
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(center, center, center, 0, Math.PI * 2);
        ctx.fill();

        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        return texture;
    }
    

</script>



<template>
    <canvas ref="canvas"></canvas>
</template>

<style>
    
    canvas {
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        pointer-events: none;
        background: transparent;
    }

</style>