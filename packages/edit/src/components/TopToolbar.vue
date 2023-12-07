<template>
  <div>
    <p>Edit element top toolbar {{ element?.id }}</p>
  </div>
</template>

<script setup lang="ts">
// Nothing here yet.
// Copy stuff from SideToolbar.vue when you need it.
defineProps<{ element: Element }>();
defineEmits(['save']);
</script>

<style scoped></style>
