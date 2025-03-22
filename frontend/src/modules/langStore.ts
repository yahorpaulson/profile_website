import { ref } from 'vue';

export const lang = ref<'en' | 'de' | 'be'>('en');

export function changeLang(code: 'en' | 'de' | 'be') {
    lang.value = code;
}
