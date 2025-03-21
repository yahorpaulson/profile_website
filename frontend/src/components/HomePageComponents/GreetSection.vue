<template>
    <div>
        <h1>Hello friend!</h1>
        <p>My name is Yahor Paulson. Welcome!</p>
    </div>
</template>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
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
        opacity: 0; /* make things invisible upon start */
        
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


</style>