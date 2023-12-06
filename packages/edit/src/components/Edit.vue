<template>
  <div class="tce-container">
    <div>
      <input 
        type="text" 
        v-model="element.data.author_data.text" 
        class="text-input"
        />
    </div>
    <button 
      @click="save_author_data"
      class="save-button"
      >Save</button>
  </div>
</template>

<script setup lang="ts">
import { Element } from 'tce-manifest';

const props = defineProps<{ element: Element; isFocused: boolean; }>();
const emit = defineEmits(['save']);

const save_author_data = () => {
  const { data } = props.element;
  console.log(JSON.stringify(data));  
  const author_data = data.author_data;
  emit('save', { ...data, author_data });
};
</script>

<style scoped>
.tce-container {
  background-color: transparent;
  margin-top: 1rem;
  padding: 1rem;
  border: 2px dashed #888;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
}

.text-input {
  background-color: white;
  border: 1px solid #ccc;
  padding: 2px;
}

.save-button {
  background-color: white;
  border: 1px solid black;
  padding: 2px;
  margin: 5px;
}

.save-button:active {
  background-color: #eee;
  border: 1px solid #eee;
  padding: 2px;
}

</style>
