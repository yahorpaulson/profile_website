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
            
            <input type="text" placeholder="Your feedback" class="feedback-input" />
            <button class="feedback-button" @click="sendFeedback">{{ t.titles.home.send }}</button>
        </div>
    </div>
        

</template>


<script setup lang="ts">

    import { t } from '../../modules/langStore';
    import { ref } from 'vue';

    const selectedMark = ref(0)
    const hoverMark = ref<number | null>(null)

    const feedbackText = ref('')

    async function sendFeedback() {
        if (selectedMark.value === 0) {
            alert('Please rate before sending!')
            return
        }

        try {
            const res = await fetch('/api/feedback', {
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

            const data = await res.json()

            if (res.ok) {
                alert('✅ Feedback sent!')
                feedbackText.value = ''
                selectedMark.value = 0
            } else {
                alert('❌ Error: ' + data.message)
            }
        } catch (err) {
            console.error(err)
            alert('❌ Network error')
        }
    }



</script>

<style lang="css" scoped>

    .feedback-title {
        text-align: center;
        color: white;
        font-size: 1.5rem;
        
        text-shadow: 0 0 8px lime;
    }
    .feedback-section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        text-shadow: 2px 2px 4px lime;
        
    }
    .feedback-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 30vh;
        color: white;
        text-shadow: 2px 2px 4px lime;
        
    }
    .feedback-text > input {
        width: 300px;
        height: 50px;
        border-radius: 10px;
        border: none;
        padding: 10px;
        font-size: 1rem;
        margin-bottom: 20px;
        box-shadow: 0 0 10px lime;
        transition: 0.3s ease-in-out;
        opacity: 0.8;
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
        width: 150px;
        height: 50px;
        border-radius: 10px;
        border: none;
        background-color: transparent;
        color: white;
        font-size: 1rem;
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
        margin-bottom: 1rem;
    }

    .stars svg{
        width: 36px;
        height: 36px;
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
</style>