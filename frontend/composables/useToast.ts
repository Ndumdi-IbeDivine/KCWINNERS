import { ref } from "vue"

const toasts = ref<{ id: number; message: string; type: "success" | "error" }[]>([])

export function useToast() {
  function show(message: string, type: "success" | "error" = "success") {
    const id = Date.now()
    toasts.value.push({ id, message, type })

    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id)
    }, 3000) // auto dismiss in 3s
  }

  return { toasts, show }
}
