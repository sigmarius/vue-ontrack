<script setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";
import BaseButton from "@/components/BaseButton.vue";

// defineProps(["options", "placeholder", "selected"]);

defineProps({
  selected: Number,
  placeholder: {
    type: String,
    default: "Rest",
  },
  options: {
    required: true,
    type: Array,
  },
});
</script>

<template>
  <div class="flex gap-2">
    <BaseButton>
      <XMarkIcon class="h-8" />
    </BaseButton>

    <select class="py-1 px-2 w-full text-2xl truncate rounded bg-gray-100">
      <option selected disabled value="">{{ placeholder }}</option>
      <option
        v-for="{ value, label } in options"
        :value="value"
        :key="value"
        :selected="value === selected"
      >
        {{ label }}
      </option>
    </select>
  </div>
</template>
