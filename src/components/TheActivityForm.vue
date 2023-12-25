<script setup>
import BaseButton from "@/components/BaseButton.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";
import { isActivityValid } from "@/validators";

let activity = "";

function submit() {
    emit('submit', activity);
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
      <input
        type="text"
        class="w-full px-4 rounded border text-xl"
        placeholder="Activity name"
        :value="activity"
        @input="activity = $event.target.value"
      />

      <BaseButton>
        <PlusIcon class="h-8" />
      </BaseButton>
    </form>
</template>
