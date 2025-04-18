<template>

    <div class="link">
        <button class="download">
            <a href="/Yahor-Siarheyeu.pdf" download="Yahor Paulson (Siarheyeu_SV)">
                {{ displayText }}
            </a>
        </button>
    </div>
</template>
  

<script setup lang="ts">
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import { t } from '../../modules/langStore';
    import { computed, watch } from 'vue';

    const fullText = computed(() => t.value.resume.text);
    const displayText = ref('');
    const speed = 100;
    const pause = 1000;

    let i = 0;
    let intervalId: number;
    let timeoutId: number = 0;


    function startTyping() {

        clearInterval(intervalId);
        clearTimeout(timeoutId);

        displayText.value = '';
        i = 0;

        intervalId = window.setInterval(() => {
            if (i < fullText.value.length) {
                displayText.value += fullText.value.charAt(i);
                i++;
            } else {
                clearInterval(intervalId);
                setTimeout(startTyping, pause);
            }
        }, speed);
    }

    onMounted(() => {
        startTyping();
    });

    onBeforeUnmount(() => {
        
        clearInterval(intervalId);
        clearTimeout(timeoutId);

    });
    watch(fullText, () => {
        startTyping();
    });

</script>







<style lang="css" scoped>
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }


    .link{
        display: flex;
        position: relative;
        z-index: 1;
        width: 100%;
        min-height: 100px;
        align-items: center;
        justify-content: center;
        margin-bottom: 50px;
        opacity: 0.8;
        

        
    }
    .download{

        overflow: hidden;
        position: relative;
        width: clamp(50rem, 60vw, 70rem);
        height: clamp(5rem, 8vw, 10rem);
        
        
        background-color: transparent;
        border-color: lime;
        border-radius: 2%;
        box-shadow: 0 0 10px lime;
        
    
    }
    a:link{
        color: white;
        text-decoration: none;
        font-size: clamp(1.5rem, 2vw, 3rem);
    }
    a::after{
        content: "|";
        animation: blink 1s step-end infinite;
    }
    button{
        transition: 1s ease;
    }
    button:hover{
        transform: scale(1.1);
        background-color: black;
        
    }

    @media (max-width: 600px){
        .download{
            margin: 60px;
        }
    }
    


</style>