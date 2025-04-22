<template>
    <div class="greet-container">
      <h1>Hello friend!</h1>
      <p>My name is Yahor Paulson. Welcome!</p>
      <canvas ref="arrowCanvas" class="arrow-canvas"></canvas>
    </div>
</template>

<script setup lang="ts">
    
    import { onMounted, ref } from 'vue';

    const arrowCanvas = ref<HTMLCanvasElement | null>(null);

    let y = 0

    onMounted(() => {
        const canvas = arrowCanvas.value
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const ratio = window.devicePixelRatio || 1 //1.25
        const width = canvas.clientWidth || 100
        const height = canvas.clientHeight || 100
        

        
        canvas.width = width * ratio
        canvas.height = height * ratio
        ctx.scale(ratio, ratio)

        
        const x = width/2


        let hasScrolled = false
        let animationStarted = false
        let animationFrameId: number

        

        function drawArrow() {
            if (hasScrolled) return
            animationStarted = true

            if (!ctx || !canvas) return

            ctx.clearRect(0, 0, width, height)

            ctx.beginPath()
            ctx.lineWidth = 2;
            ctx.fillStyle = 'white'


            ctx.moveTo(x, y)
            ctx.lineTo(x-30, y + 50)
            ctx.lineTo(x-10, y + 50)
            ctx.lineTo(x-10, y+70)
            ctx.lineTo(x+10, y+70)
            ctx.lineTo(x+10, y+50)
            ctx.lineTo(x+30, y+50)
            ctx.lineTo(x, y)
            

            
           
        
            ctx.fill();
            
            ctx.closePath()

            y -= 2
            if (y < 0) y = 200

            animationFrameId = requestAnimationFrame(drawArrow)
        }

        setTimeout(() => {
            drawArrow()
        }, 5000)

        window.addEventListener('scroll', () =>{
            hasScrolled = true
            if(animationStarted){
                cancelAnimationFrame(animationFrameId)
                canvas.style.opacity = '0'
            }
            
        })
        



    })


</script>



<style scoped>
.greet-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  height: 100vh;
  color: white;
  text-shadow: 2px 2px 4px lime;
  text-align: center;
  margin-left:5%;
  margin-right:5%;
}

.greet-container h1 {
  font-size: clamp(2.5rem, 3vw, 5rem); 
  animation: 1s ease-out 0s 1 slideInFromLeft;
  animation-fill-mode: forwards;
}

.greet-container p {
  font-size: clamp(1.5rem, 2.5vw, 4rem);
  opacity: 0;
  animation: 5s ease 1s 1 appear;
  animation-fill-mode: forwards;
}

.arrow-canvas {
  position: absolute;
  width: 100px;
  height: 100%;
  background: transparent;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  opacity: 0.5;
  transition: opacity 0.2s ease;
}

@media (max-width: 600px) {
  .greet-container {
    max-width: 100%;
    align-items: center;
    justify-content: center;
  }
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}


</style>