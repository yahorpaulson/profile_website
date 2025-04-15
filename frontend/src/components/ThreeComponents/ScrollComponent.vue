<script lang="ts">
    import * as THREE from 'three';

    const count = 1000;
    const positions = new Float32Array(count * 3); // each vertex has 3 coordinates (x, y, z)

    const geometry = new THREE.BufferGeometry(); // create a buffer geometry


    //we define coordinates of every vertex in the array
    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 100; // random value between -50 and 50
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)); // set the position attribute of the geometry
    //each of 3 values in the array is a coordinate of a vertex

    
</script>