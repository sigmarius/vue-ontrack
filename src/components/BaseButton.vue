<script setup>
import { BUTTON_TYPE_NEUTRAL, BUTTON_TYPE_DANGER } from "@/constants";
import { isButtonTypeValid } from "@/validators";

defineProps({
  type: {
    type: String,
    default: BUTTON_TYPE_NEUTRAL,
    validator: isButtonTypeValid,
  },
});

// динамические ключи заключаются в []
const typeClasses = {
  [BUTTON_TYPE_NEUTRAL]: "bg-gray-100 enabled:hover:bg-gray-200",
  [BUTTON_TYPE_DANGER]: "text-white bg-red-500 enabled:hover:bg-red-600",
};
</script>

<template>
  <button
    :class="`${typeClasses[type]} p-3 rounded disabled:cursor-not-allowed disabled:opacity-50`"
  >
    <slot></slot>
  </button>
</template>
