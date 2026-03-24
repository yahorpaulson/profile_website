<template>
    <section class="progression" v-if="progress">
        <h2>{{ localizedTitle }}</h2>

        <div class="progress-content">
            <div v-for="(year, index) in localizedYears" :key="year.year" class="column" :style="{
                height: animated ? year.height + 'px' : '0px',
                transitionDelay: index * 150 + 'ms'
            }">
                <div class="bar">
                    <div class="details">
                        <h3>{{ year.title }}</h3>
                        <ul>
                            <li v-for="item in year.items" :key="item">
                                {{ item }}
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="label">
                    <span class="year">{{ year.year }}</span>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';

const progress = ref(null);
const animated = ref(false);


const currentLang = computed(() => lang.value);

const localizedTitle = computed(() => {
    if (!progress.value?.title) return '';
    return progress.value.title[currentLang.value] || progress.value.title.en;
});

const localizedYears = computed(() => {
    if (!progress.value?.years) return [];

    return progress.value.years.map((year, index) => ({
        ...year,
        title: year.title?.[currentLang.value] || year.title?.en || '',
        items: year.items?.[currentLang.value] || year.items?.en || [],
        height: [120, 180, 240][index] || 150
    }));
});

onMounted(async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/progress`);
        const data = await response.json();
        progress.value = data;
    } catch (error) {
        console.error('Failed to fetch progression data:', error);
    }

    setTimeout(() => {
        animated.value = true;
    }, 200);
});
</script>

<style scoped>
.progression {
    text-align: center;
    padding: 60px 20px;
}

.columns {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 40px;
    height: 300px;
    margin-top: 40px;
}

.column {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.bar {
    width: 60px;
    background: linear-gradient(180deg, #00f0ff, #0077ff);
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    transition: 0.8s ease;
}

/* Hover effect */
.bar:hover {
    transform: scale(1.05);
}


.details {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: #0b0f1a;
    color: white;
    padding: 15px;
    border-radius: 10px;
    width: 220px;
    opacity: 0;
    pointer-events: none;
    transition: 0.3s;
}

.bar:hover .details {
    opacity: 1;
    transform: translateX(-50%) translateY(-10px);
}

.details h3 {
    font-size: 14px;
    margin-bottom: 10px;
}

.details ul {
    padding-left: 15px;
    text-align: left;
}

.details li {
    font-size: 12px;
    margin-bottom: 4px;
}

.label {
    margin-top: 10px;
    text-align: center;
}

.year {
    display: block;
    font-weight: bold;
}

.name {
    font-size: 12px;
    color: #aaa;
}
</style>