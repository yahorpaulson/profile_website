<script setup lang="ts">
    import {t} from './../../modules/langStore'

    function openGithub(){
        window.open(t.value.contacts.github);
    }

    function openEmail() {
        window.location.href = `mailto:${t.value.contacts.email}?subject=Yahor Paulson Website`;
    }

    function callMe(){
        window.location.href = `tel: ${t.value.contacts.phone}`;
    }
</script>

<template>

    <h1 class="contactTitle">{{ t.titles.home.contacts }}</h1>
       
    <div class="contact-wrapper" >
        
        
        <button class="email" @click="openEmail">
            <span class="icon email-icon"></span>
            openEmail
        </button>

        <button class="github" @click="openGithub" value="yahorpaulson">
            <span class="icon github-icon">/</span>
            View on GitHub
        </button>

        <button class="tel" @click="callMe">
            <span class="icon phone-icon"></span>
            Contact by phone
        </button>
    </div>
</template>

<style lang="css" scoped>


    /**______________MAIN STYLES _____________ */


    @keyframes spinLeftY {
        0% { 
            transform: rotateY(0deg);
            
        }
        50% {
            left: -40px;
            
        }
        100% { 
            transform: rotateY(360deg);
            
        }
    }
    @keyframes ring {
        0%   { left:50% }
        25%  { left:51% }
        50% { left:50% }
        75% { left:51%}
        100%{ left:50%}
    }

    @keyframes spinRightY {
        0% { 
            transform: rotateY(0deg);
            
        }
        50% {
            left: 50px;
            
        }
        100% { transform: rotateY(360deg); }
    }

    @keyframes pulse {
        0% { box-shadow: 0 0 5px lime; }
        50% { box-shadow: 0 0 15px lime; }
        100% { box-shadow: 0 0 5px lime; }
    }


    .contact-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        max-width: 90%;
        margin: 0 auto 50px;
        color: white;
    }
    .contactTitle{
        display: flex;
        color: white;
        justify-content: center;
        flex: 1;
        text-align: center;
        margin-bottom: 50px;
        margin-top: 5rem;

        font-size: clamp(1rem, 2vw, 3rem);
    }
    button{
        background-color: transparent;
        overflow: hidden;
        color: white;
        border-color: lime;
        box-shadow: 0 0 10px 2px lime;
        min-height: 100px;
        border-radius: 2%;
        transition: 1.2s ease;
        animation: none;
        z-index:1;
        min-width: 30%;
        height: clamp(70px, 8vh, 150px);
        font-size: clamp(1rem, 2vw, 1.8rem);
        padding-top: 30px;
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
    button:hover::before {
        opacity: 1;
    }



    /**__________________EMAIL BUTTON________________ */
    .email {
        position: relative;
    }


    .email .email-icon {
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
    
    
    .email-icon::before, .icon::after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
    }

    .email-icon::before {
        border-bottom: 12px solid lime;
        top: -12px;
        left: 0;
        transform: rotateX(180deg);
        transition: transform 1.5s ease;
        transform-origin: bottom center;
    }

    .email-icon::after {
        border-top: 12px solid lime;
        bottom: 8px;
        left: 0;
        opacity: 0.5;
    }


    .email:hover .email-icon::before {
        transform: rotateX(0deg);
    }


    /**__________________GITHUB BUTTON________________ */
    .github{
        position: relative;
    }
    .github-icon {
        
        color:lime;
        font-size: 25px;
        left: 50%;
        transform: translateX(-50%);
        display: inline-block;
        width: 40px;
        height: 40px;
        position: absolute;
        top: 10px;
        left: 50%;
        
    }

    .github-icon::before {
        content: "<";
        position: absolute;
        left: -5px;
        top: -5px;
        font-size: 30px;
        color: lime;
        

        transform-origin: center left;

    }
    .github-icon::after {
        content: ">";
        position: absolute;
        left: 15px;
        top: -5px;
        font-size: 30px;
        color: lime;
        box-shadow: 0 0 6px lime;

        transform-origin: center right;
    }
    .github-icon:hover::before{
        animation: spinLeftY 1.5s linear alternate;
    }
    .github-icon:hover::after{
        animation: spinRightY 1.5s linear alternate;
    }

    /**__________________PHONE BUTTON________________ */
    
    
    .tel{
        position: relative;
    }
    .phone-icon {
        height: 30px;
        width: 20px;
        position: absolute;
        border: 2px solid lime;
        border-radius: 4px;
        top: 5px;
        left: 50%;
        transform: translateX(-50%);
        
    }
    
    .phone-icon::before {
        content: "";
        position: absolute;
        top: 3px;
        left: 50%;
        transform: translateX(-50%);
        width: 10px;
        height: 2px;
        background-color: lime;
        border-radius: 1px;
    }


    .phone-icon::after {
        content: "";
        position: absolute;
        bottom: 3px;
        left: 50%;
        transform: translateX(-50%);
        width: 4px;
        height: 4px;
        border: 1px solid lime;
        border-radius: 50%;
    }
    .phone-icon:hover{
        animation: pulse 0.5s ease-in-out infinite;
        animation: ring 0.5s ease-in-out infinite;
    }
    .parent {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media (max-width: 600px) {
        .contact-wrapper {
            flex-direction: row;
            flex-grow: 1;
            
            margin-left: 5%;
            margin-right: 5%;
            

            
        }

        .email,
        .github,
        .tel {
            font-size: 0;
            position: relative;
    
        }

        .email .email-icon,
        .github .github-icon,
        .tel .phone-icon {
            top: 50%;
            transform: translate(-50%, -50%);
        }


    }




</style>

