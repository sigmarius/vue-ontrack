<script setup>
import { PAGE_PROGRESS, HUNDRED_PERCENT } from '@/constants'
import { ICON_CHECK_CIRCLE } from '@/icons'
import BaseIcon from '@/components/BaseIcon.vue'
import { useTotalProgress } from '@/composables/total-progress'
import { navigate } from '@/router'

const { percentage, colorClass } = useTotalProgress()
</script>

<template>
  <a :href="`#${PAGE_PROGRESS}`" class="text-sm" @click="navigate(PAGE_PROGRESS)">
    <div v-if="percentage < HUNDRED_PERCENT" class="flex items-center gap-1">
      <div>
        Progress:
        <span class="font-mono">{{ percentage }}%</span>
      </div>

      <div :class="`h-3 w-3 rounded-full bg-red-500 ${colorClass}`"></div>
    </div>

    <div v-else class="flex items-center gap-1">
      Day complete!

      <BaseIcon :name="ICON_CHECK_CIRCLE" class="h-7 text-green-500" />
    </div>
  </a>
</template>
