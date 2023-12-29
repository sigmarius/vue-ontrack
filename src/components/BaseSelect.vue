<script setup>
import { computed } from "vue";

import BaseButton from "@/components/BaseButton.vue";
import BaseIcon from "./BaseIcon.vue";
import {
  validateSelectOptions,
  isUndefinedOrNull,
  isSelectValueValid,
} from "@/validators";

import { BUTTON_TYPE_NEUTRAL } from "@/constants";
import { normalizeSelectValue } from "@/functions";

// defineProps(["options", "placeholder", "selected"]);

const props = defineProps({
  selected: [String, Number],
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
  select: isSelectValueValid,
});

// computed свойства определяются на основе значений других свойств
// являются реактивными, и запускаются при изменении реактивных свойств
const isNotSelected = computed(() => isUndefinedOrNull(props.selected));

function select(value) {
  emit("select", normalizeSelectValue(value));
}
</script>

<template>
  <div class="flex gap-2">
    <BaseButton :type="BUTTON_TYPE_NEUTRAL" @click="select(null)">
      <BaseIcon name="XMark" class="h-8" />
    </BaseButton>

    <select
      class="py-1 px-2 w-full text-2xl truncate rounded bg-gray-100"
      @change="select($event.target.value)"
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
