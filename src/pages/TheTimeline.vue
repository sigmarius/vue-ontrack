<template>
  <div class="mt-7">
    <ul>
      <li
        v-for="i in 24"
        :key="i"
        class="relative px-4 py-10 flex flex-col gap-2 border-t border-gray-200"
      >
        <a
          href="#"
          class="absolute -top-4 left-1/2 -translate-x-1/2 px-2 font-mono text-lg tetx-gray-500 rounded bg-gray-100"
        >
          {{ i }}:00
        </a>
      </li>
    </ul>
  </div>
</template>
