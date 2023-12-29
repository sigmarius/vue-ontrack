<script setup>
import {
  ArrowPathIcon as ArrowPath,
  ChartBarIcon as ChartBar,
  CheckCircleIcon as CheckCircle,
  ClockIcon as Clock,
  ListBulletIcon as ListBullet,
  PauseIcon as Pause,
  PlayIcon as Play,
  PlusIcon as Plus,
  TrashIcon as Trash,
  XMarkIcon as XMark,
} from "@heroicons/vue/24/outline";

const icons = {
  ArrowPath,
  ChartBar,
  CheckCircle,
  Clock,
  ListBullet,
  Pause,
  Play,
  Plus,
  Trash,
  XMark,
};

defineProps({
    name: {
        type: String,
        required: true
    }
})
</script>

<template>
    <component :is="icons[name]" />
</template>
