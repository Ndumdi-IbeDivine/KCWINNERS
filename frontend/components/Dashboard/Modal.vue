<template>
    <div>
        <BlackBtn @click="open = true">
            {{ btnTitle }}
        </BlackBtn>
        <TransitionRoot as="template" :show="open">
            <Dialog class="relative z-10" @close="open = false">
                <TransitionChild
                    as="template"
                    enter="ease-out duration-300"
                    enter-from="opacity-0"
                    enter-to=""
                    leave="ease-in duration-200"
                    leave-from=""
                    leave-to="opacity-0"
                >
                    <div
                        class="fixed inset-0 bg-gray-900/50 transition-opacity"
                    />
                </TransitionChild>

                <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div
                        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
                    >
                        <TransitionChild
                            as="template"
                            enter="ease-out duration-300"
                            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enter-to=" translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leave-from=" translate-y-0 sm:scale-100"
                            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel
                                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all sm:my-8 sm:w-full sm:max-w-lg w-full"
                            >
                                <DialogTitle class="bg-[#F5F6F7] px-[50px] py-[33px] font-bold text-[18px]">
                                    {{ modalTitle }}
                                </DialogTitle>
                                <div
                                    class="bg-white px-[50px] py-[33px]"
                                >
                                    <div>
                                        <div>
                                            <div>
                                                <slot></slot>
                                            </div>
                                            <div class="mt-[33px] flex justify-end gap-[5px]">
                                                <button class="px-3 lg:px-[21px] py-3 rounded-[31px] hover:bg-[#e4e4e4] border border-[#F5F6F7] transition ease-in text-[14px]" @click="open = false">
                                                    Cancel
                                                </button>
                                                <button :class="[loading ? 'bg-gray-400 cursor-not-allowed text-gray-500' : '', 'px-3 lg:px-[21px] py-3 lg:py-[13px] rounded-[31px] bg-black text-white hover:bg-gray-800 transition ease-in text-[14px]']" @click="handleContinue" :disabled="loading">
                                                    {{ continueBtn }}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>

<script setup lang="ts">
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
} from "@headlessui/vue";
// import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";

withDefaults(
  defineProps<{
        btnTitle: string
        modalTitle: string
        continueBtn?: string
        loading?: boolean
  }>(),
  {
    continueBtn: "Continue",
    loading: false
  }
)

const emit = defineEmits(['continue'])

const open = ref(false);

function handleContinue() {
    emit('continue')
    // open.value = false
}
</script>
