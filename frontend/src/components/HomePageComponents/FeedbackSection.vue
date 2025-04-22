<template>
    <div class="feedback-section" id="feedback-section">
        <div class="feedback-title">
            <p>{{ t.titles.home.feedback }}</p>
        </div>

        <div class="stars">
            <svg
                v-for="n in 5"
                :key="n"
                @click="selectedMark = n"
                @mouseover="hoverMark = n"
                @mouseleave="hoverMark = null"
                :class="{ active: n <= (hoverMark ?? selectedMark) }"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                >
                <path
                    d="M12 17.27L18.18 21l-1.64-7.03
                        L22 9.24l-7.19-.61L12 2
                        9.19 8.63 2 9.24l5.46 4.73
                        L5.82 21z"
                />
            </svg>
        </div>

        <div class="feedback-text">
            
            <input
                type="text"
                placeholder="Your feedback"
                class="feedback-input"
                v-model="feedbackText"
            />
            <button class="feedback-button" @click="sendFeedback">{{ t.titles.home.send }}</button>

            <p v-if="showThanks" class="thanks-message">{{ t.titles.home.thanks }}</p>

        </div>
    </div>
        

</template>


<script setup lang="ts">

    import { t } from '../../modules/langStore';
    import { ref } from 'vue';

    const selectedMark = ref(0)
    const hoverMark = ref<number | null>(null)

    const feedbackText = ref('')


    const showThanks = ref(false)

    async function sendFeedback() {
        if (selectedMark.value === 0) {
            alert('Please rate before sending!')
            return
        }



        try {

            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: feedbackText.value,
                    mark: selectedMark.value,
                    time: new Date()
                })
            })

            let data = await res.json()
            

            console.log('[DEBUG]: Response:', data)

            if (res.ok) {
                showThanks.value = true

                setTimeout(() => {
                    showThanks.value = false
                }, 5000) 
                feedbackText.value = ''
                selectedMark.value = 0
            } else {
                alert(' Error: ' + data.message)
            }
        } catch (err) {
            console.error(err)
            alert(' Network error')
        }
    }



</script>

<style lang="css" scoped>

    @keyframes appear {
        0% {
            opacity: 0;
            transform: translateY(-20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .feedback-title {
        text-align: center;
        color: white;
        font-size: clamp(1.5rem, 2vw, 3rem);
        z-index: 1;
        
        text-shadow: 0 0 8px lime;
    }
    .feedback-section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        text-shadow: 2px 2px 4px lime;
        z-index: 1;
        gap: clamp(1rem, 1.2vw, 2rem);
    }

    .feedback-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    
        color: white;
        text-shadow: 2px 2px 4px lime;
        z-index: 1;
        margin-top: 20px;
        
    }
    .feedback-text > input {
        width: clamp(20rem, 40vw, 50rem);
        height: clamp(3rem, 5vw, 4rem);
        margin: 0 1rem 20px;
        border-radius: 10px;
        
        padding: 10px;
        font-size: clamp(1.2rem, 2vw, 2rem);
        margin-bottom: 20px;
        box-shadow: 0 0 10px lime;
        transition: 0.3s ease-in-out;
        opacity: 0.8;
        border: none;
    }
    
    .feedback-text > input:focus {
        outline: none;
        box-shadow: 0 0 20px lime;
    }
    .feedback-text > input::placeholder {
        color: black;
        opacity: 0.5;
    }
    .feedback-text > input:hover {
        box-shadow: 0 0 20px lime;
        
        transition: 0.3s ease-in-out;
    }
    .feedback-text > button {
        width: clamp(10rem, 15vw, 20rem);
        height: clamp(4rem, 5vw, 7rem);
        border-radius: 10px;
        border: none;
        background-color: transparent;
        color: white;
        font-size: clamp(1rem, 2vw, 2.2rem);
        cursor: pointer;
        box-shadow: inset 0 0 23px lime;
        transition: 0.3s ease-in-out;
    }
    .feedback-text > button:hover {
        box-shadow: inset 0 0 10px lime;
        background-color: black;
        transition: 0.3s ease-in-out;
    }

    .stars {
        display: flex;
        gap: 8px;
        z-index: 1;
        margin-bottom: 0;
        padding-bottom: 0;
    }

    .stars svg{
        height: clamp(2.5rem, 3vw, 5rem);
        
        fill: transparent;
        stroke: lime;
        stroke-width: 1.5;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    .stars svg.active {
        fill: lime;
        stroke: white;
        filter: drop-shadow(0 0 6px lime);
    }
    .thanks-message {
        color: white;
        font-size: 1.2rem;
        text-shadow: 0 0 8px lime;
        margin-top: 20px;
        transition: 0.5 ease-in-out;
        animation: appear 0.5s ease-in-out;
    }

    @media (max-width: 600px) {
    .feedback-text > input {
        width: 90%;             
        margin: 0 auto 20px;   
    }
}

    
</style>