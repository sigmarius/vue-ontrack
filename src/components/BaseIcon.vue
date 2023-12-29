<script setup>
import { ICONS } from '@/icons';
import { isIconValid } from "@/validators"

defineProps({
    name: {
        type: String,
        required: true,
        validator: isIconValid
    }
})
</script>

<template>
    <component :is="ICONS[name]" />
</template>
