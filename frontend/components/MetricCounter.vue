<script setup lang="ts">
import { ref, onMounted } from "vue";

interface Props {
    target: number;
    duration?: number;
}

const props = defineProps<Props>();

const count = ref(0);
const elementRef = ref<HTMLElement | null>(null);

const animateCount = () => {
    let start = 0;
    const end = props.target;
    const duration = props.duration || 2000;
    const increment = end / (duration / 16); // 60fps → ~16ms per frame

    const step = () => {
        start += increment;
        if (start < end) {
            count.value = Math.floor(start);
            requestAnimationFrame(step);
        } else {
            count.value = end;
        }
    };
    requestAnimationFrame(step);
};

onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                animateCount();
                observer.disconnect(); // run once
            }
        },
        { threshold: 0.5 }
    );
    if (elementRef.value) {
        observer.observe(elementRef.value);
    }
});
</script>

<template>
    <div ref="elementRef" class="text-[#181920] font-bold text-[28px]">
        {{ count }}
    </div>
</template>
