import { ref, computed } from 'vue';
import en from './../lang/eng';
import de from './../lang/deu';
import be from './../lang/bel';

export const lang = ref<'en' | 'de' | 'be'>('en');

const translations = { en, de, be };

export const t = computed(() => translations[lang.value]);

export function changeLang(code: 'en' | 'de' | 'be') {
    lang.value = code;
    console.log(lang.value);
}
