<template>
  <div>
    <div>
      <label
        for="display_name_field"
      >
        Display Name:
      </label><br>
      <input
        id="display_name_field"
        v-model="element.data.display_name"
        placeholder="Word Cloud"
        @change="update_display_name"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import { Element } from 'tce-manifest';
const props = defineProps<{ element: Element }>();
const emit = defineEmits(['save']);

const update_display_name = () => {
  const { data } = props.element;
  const display_name = data.display_name;
  emit('save', { ...data, display_name });
}

</script>

<style scoped>
label {
  font-weight: 700;
}

input, textarea {
  width: 100%;
  padding: 0.5em;
  background-color: white;
  border-radius: 5px;
}

input#should_prepopulate{
  width: auto;
  margin-right: 5px;
}
</style>
