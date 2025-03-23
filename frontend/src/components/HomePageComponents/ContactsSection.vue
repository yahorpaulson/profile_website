<script setup lang="ts">
  import {t} from './../../modules/langStore'
</script>

<template>
    <h1 class="contactTitle">{{ t.contacts.title }}</h1>
    <div class="contact-wrapper">
        

        <button class="email">
            <span class="icon"></span>
            {{ t.contacts.email }}
        </button>

        <button class="github">{{ t.contacts.github }}</button>
        <button class="tel">{{ t.contacts.phone }}</button>
    </div>
</template>

<style lang="css" scoped>
    @keyframes pulse {
        0% { box-shadow: 0 0 5px lime; }
        50% { box-shadow: 0 0 15px lime; }
        100% { box-shadow: 0 0 5px lime; }
    }


    *{
        position: relative;
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
    }
    .contact-wrapper{
        display: flex;
        flex-direction: row;
        color: white;
        margin-left: 100px;
        margin-right: 100px;
        margin-bottom: 50px;
    }
    .contactTitle{
        display: flex;
        color: white;
        justify-content: center;
        flex: 1;
        text-align: center;
        margin-bottom: 50px;
    }
    button{
        font-family: 'Share Tech Mono', monospace;
        background-color: transparent;
        overflow: hidden;
        color: white;
        border-color: lime;
        box-shadow: 0 0 10px 2px lime;
        flex: 1;
        min-height: 100px;
        border-radius: 2%;
        transition: 1.2s ease;
        animation: none;
        z-index:1;
    }

    button:hover{
        scale: 1.1;
        box-shadow: 0 0 50px 2px lime;
        animation: pulse 2s ease infinite;
        
    }

    button::before {
        content: '';
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: linear-gradient(135deg, rgba(0,255,0,0.2), rgba(0,255,0,0));
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    .email {
        position: relative;
    }


    .email .icon {
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: 30px;
        height: 20px;
        
        border: 1px solid lime;
        border-radius: 2px;
        box-shadow: 0 0 10px lime;
        z-index: 2;
    }
    
    
    .icon::before, .icon::after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
    }

    .icon::before {
        border-bottom: 12px solid lime;
        top: -12px;
        left: 0;
        transform: rotateX(180deg);
        transition: transform 1.5s ease;
        transform-origin: bottom center;
    }

    .icon::after {
        border-top: 12px solid lime;
        bottom: 8px;
        left: 0;
        opacity: 0.5;
    }


    .email:hover .icon::before {
        transform: rotateX(0deg);
    }


    button:hover::before {
        opacity: 1;
    }

</style>

