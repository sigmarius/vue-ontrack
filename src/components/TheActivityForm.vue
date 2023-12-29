<script setup>
import { nextTick, ref } from "vue";

import { createActivity } from "@/activities"

import BaseButton from "@/components/BaseButton.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import { id } from "@/functions";

// для реактивной переменной модицицируется поле value
const name = ref("");

// вариант через async
async function submit() {
  createActivity({
    id: id(),
    name: name.value,
    secondsToComplete: 0,
  });

  name.value = "";

  await nextTick();

  // выполняется после разрешения промиса
  window.scrollTo(0, document.body.scrollHeight);
}
</script>

<template>
  <form
    class="sticky bottom-[57px] p-4 flex gap-2 border-t bg-white"
    @submit.prevent="submit"
  >
    <!-- v-model: сокращенная нотация для :value и @input -->
    <!--  <input :value="name" @input="name = $event.target.value" -->
    <input
      type="text"
      class="w-full px-4 rounded border text-xl"
      placeholder="Activity name"
      v-model="name"
    />

    <BaseButton :disabled="name.trim() === ''">
      <BaseIcon name="Plus" class="h-8" />
    </BaseButton>
  </form>
</template>
