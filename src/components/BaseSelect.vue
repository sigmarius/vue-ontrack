<script setup>
import { computed } from "vue";

import { XMarkIcon } from "@heroicons/vue/24/solid";
import BaseButton from "@/components/BaseButton.vue";
import {
  validateSelectOptions,
  isUndefinedOrNull,
  isNumberOrNull,
} from "@/validators";

import { BUTTON_TYPE_NEUTRAL } from "@/constants";

// defineProps(["options", "placeholder", "selected"]);

const props = defineProps({
  selected: Number,
  placeholder: {
    type: String,
    default: "Rest",
  },
  options: {
    required: true,
    type: Array,
    validator: validateSelectOptions,
  },
});

const emit = defineEmits({
  select: isNumberOrNull,
});

// computed свойства определяются на основе значений других свойств
// являются реактивными, и запускаются при изменении реактивных свойств
const isNotSelected = computed(() => isUndefinedOrNull(props.selected));
</script>

<template>
  <div class="flex gap-2">
    <BaseButton :type="BUTTON_TYPE_NEUTRAL" @click="emit('select', null)">
      <XMarkIcon class="h-8" />
    </BaseButton>

    <select
      class="py-1 px-2 w-full text-2xl truncate rounded bg-gray-100"
      @change="emit('select', Number($event.target.value))"
    >
      <option :selected="isNotSelected" disabled value="">
        {{ placeholder }}
      </option>
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
