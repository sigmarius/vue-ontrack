<script setup>
import { ICONS } from '@/icons'
import { isIconValid } from '@/validators'

defineProps({
  name: {
    type: String,
    required: true,
    validator: isIconValid
  }
})
</script>

<template>
  <!-- $attrs содержит все переданные атрибуты, для которых явно не было определено внешних свойств -->
  <component :is="ICONS[name]" :class="$attrs.class || 'h-8'" />
</template>
