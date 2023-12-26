<script setup>
import { nextTick, ref } from "vue";

import BaseButton from "@/components/BaseButton.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";
import { isActivityValid } from "@/validators";

// для реактивной переменной модицицируется поле value
const activity = ref("");

function submit() {
  emit("submit", activity.value);

  activity.value = "";

  // выполняется после обновления DOM-дерева на основе новых значений реактивных переменных
  nextTick(() => {
    // прокрутка страницы вниз после добавления новой активности
    window.scrollTo(0, document.body.scrollHeight);
  });

  // вариант через промис
  nextTick().then(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
}


const emit = defineEmits({
  submit: isActivityValid,
});
</script>

<template>
  <form
    class="sticky bottom-[57px] p-4 flex gap-2 border-t bg-white"
    @submit.prevent="submit"
  >
    <!-- v-model: сокращенная нотация для :value и @input -->
    <!--  <input :value="activity" @input="activity = $event.target.value" -->
    <input
      type="text"
      class="w-full px-4 rounded border text-xl"
      placeholder="Activity name"
      v-model="activity"
    />

    <BaseButton :disabled="activity.trim() === ''">
      <PlusIcon class="h-8" />
    </BaseButton>
  </form>
</template>
