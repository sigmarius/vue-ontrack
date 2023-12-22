<script>
export default {
  inheritAttrs: false,
};
</script>

<template>
  <li class="flex-1">
    <a
      v-bind="$attrs"
      class="p-2 flex flex-col items-center text-xs capitalize"
    >
      <slot></slot>
    </a>
  </li>
</template>
