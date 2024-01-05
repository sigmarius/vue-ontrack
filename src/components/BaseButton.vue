<script>
// выполняется только один раз при инициализации, а не для каждого созданного компонента
import {
  BUTTON_TYPE_NEUTRAL,
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_PRIMARY,
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING
} from '@/constants'

// динамические ключи заключаются в []
const typeClasses = {
  [BUTTON_TYPE_NEUTRAL]: 'bg-gray-100 enabled:hover:bg-gray-200',
  [BUTTON_TYPE_DANGER]: 'text-white bg-red-500 enabled:hover:bg-red-600',
  [BUTTON_TYPE_PRIMARY]: 'text-white bg-purple-500 enabled:hover:bg-purple-600',
  [BUTTON_TYPE_SUCCESS]: 'text-white bg-green-500 enabled:hover:bg-green-600',
  [BUTTON_TYPE_WARNING]: 'text-white bg-yellow-500 enabled:hover:bg-yellow-600'
}
</script>

<script setup>
import { isButtonTypeValid } from '@/validators'

const props = defineProps({
  type: {
    type: String,
    default: BUTTON_TYPE_PRIMARY,
    validator: isButtonTypeValid
  }
})

const classes = [
  'p-3 rounded disabled:cursor-not-allowed disabled:opacity-50',
  typeClasses[props.type]
]
</script>

<template>
  <button :class="classes">
    <slot />
  </button>
</template>
