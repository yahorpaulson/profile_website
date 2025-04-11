<template>
    <div class="greet-container">
      <h1>Hello friend!</h1>
      <p>My name is Yahor Paulson. Welcome!</p>
      <canvas ref="arrowCanvas" class="arrow-canvas"></canvas>
    </div>
</template>

<script setup lang="ts">
    
    import { h, onMounted, ref } from 'vue';

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

            y -= 4
            if (y < 0) y = 500

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
  position: relative;
  text-align: center;
  
}

.arrow-canvas {
  position: absolute;
  width: 100px;
  height: 100px;
  background: transparent;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  opacity: 0.5;
  top: 20%;
 
  }

.arrow-canvas {
  transition: opacity 0.2s ease;
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

    
    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        color: white;
        text-shadow: 2px 2px 4px lime;
        font-family: 'Share Tech Mono', monospace;
       
    }

    h1 {
        font-size: 3rem;
        animation: 1s ease-out 0s 1 slideInFromLeft;
        animation-fill-mode: forwards;
    }
    p {
        opacity: 0;
        font-size: 1.5rem;
        animation: 5s ease 1s 1 appear; /* 5s duration, 1s delay, 1 iteration */
        animation-fill-mode: forwards; /* keep the final state */

    }
    @media (max-width:600px) {
        div {
            max-width: 100%;
            align-items: center;
        }
    }


</style>