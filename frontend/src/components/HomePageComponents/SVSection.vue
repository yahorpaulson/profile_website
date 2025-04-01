<template>


    <div class="link">
        <button class="download">
            <a href="../../../public/YPSV.pdf" download="Yahor Paulson (Siarheyeu SV)">Access to my SV</a>
        </button>
        
    </div>


</template>


<style lang="css" scoped>

    @keyframes blink{
        0%{
            opacity: 1;
        }
        50%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }

    .link{
        display: flex;
        position: relative;
        z-index: 1;
        width: 100%;
        min-height: 100px;
        align-items: center;
        justify-content: center;

        
        /** Temporary hidden */
        display: none;
    }
    .download{

        overflow: hidden;
        position: relative;
        height: 100px;
        width: 500px;
        background-color: transparent;
        border-color: lime;
        border-radius: 5%;
        box-shadow: 0 0 10px lime;
    
    }
    a:link{
        color: white;
        text-decoration: none;
        font-size: 1.5rem;
        animation: blink 1s infinite ease;
    }
    


</style>