<template>
  <nav aria-label="Breadcrumb" class="flex">
    <ol class="flex overflow-hidden rounded-lg border border-gray-200 text-gray-600">
      <li
          v-for="(crumb, index) in crumbs"
          :key="index"
          class="relative flex items-center"
      >
        <!-- Separator for items after the first -->
        <span v-if="index > 0" class="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"></span>

        <!-- Breadcrumb link -->
        <a
            :href="crumb.link"
            :class="[
            'flex h-10 items-center px-4 text-xs font-medium transition hover:text-gray-900',
            index === 0 ? 'bg-gray-100' : 'bg-white ps-8 pe-4'
          ]"
        >
          <span>{{ crumb.label }}</span>
        </a>
      </li>
    </ol>
  </nav>
</template>

<script setup>
defineProps({
  crumbs: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<style scoped>
/* Custom styling if needed */
</style>
