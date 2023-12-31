<script setup>
const props = defineProps(['index', 'activity']);

const color = ['red', 'yellow', 'blue', 'green'][props.index];
const progress = [10, 50, 70, 100][props.index];
const timeProgress = ['03:00 / 30:00', '15:00 / 30:00', '21:00 / 30:00', '30:00 / 30:00'][props.index];
</script>

<template>
    <li class="p-4 flex flex-col gap-1">
      <div class="text-xl truncate">{{ activity.name }}</div>
      <div class="h-5 flex overflow-hidden rounded bg-neutral-200">
        <div :class="`bg-${color}-500`" :style="`width: ${progress}%;`"></div>
      </div>

      <div class="flex justify-between font-mono text-sm">
        <span>{{ progress }}%</span>
        <span>{{ timeProgress }}</span>
      </div>
    </li>
</template>
