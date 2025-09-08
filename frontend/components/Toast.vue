<template>
    <div class="fixed bottom-4 right-4 space-y-2 z-50">
        <div
            v-for="toast in toasts"
            :key="toast.id"
            :class="[
                'px-4 py-2 rounded-lg shadow-md text-white text-sm',
                toast.type === 'success' ? 'bg-green-500' : 'bg-red-500',
            ]"
        >
            {{ toast.message }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { useToast } from "~/composables/useToast";

const { toasts } = useToast();
</script>
