<template>
    <div>
        <button
            :disabled="isDisabled"
            :class="[
                customClass,
                // 'py-3.5 px-[49px]'
                 'px-6 py-4 text-white rounded transition duration-200',
                isDisabled
                    ? 'bg-gray-400 cursor-not-allowed text-gray-500'
                    : 'bg-[var(--kc-green)] ease-in transition hover:bg-[var(--kc-green-dark)] cursor-pointer'
            ]"
        >
            <slot></slot>
        </button>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    customClass?: string;
    isDisabled?: boolean;
}>();
</script>