<template>
    <div>
        <h1>Hello friend!</h1>
        <p>My name is Yahor Paulson. Welcome!</p>
    </div>
</template>

<style scoped>
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
        background-color: black;
        color: white;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    h1 {
        font-size: 3rem;
        animation: 1s ease-out 0s 1 slideInFromLeft;
    }
    p {
        opacity: 0;
        font-size: 1.5rem;
        animation: 5s ease 1s 1 appear; /* 5s duration, 1s delay, 1 iteration */
        animation-fill-mode: forwards; /* keep the final state */

    }


</style>