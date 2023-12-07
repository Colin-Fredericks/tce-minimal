<template>
  <!-- 
    Your TE's author-side info is stored in element.data
    Currently we keep TE-specific info in the author_data object, 
    and generic info in their own properties in the data object.
    Defaults and valid values are set in the manifest/src/index.ts 
      and interfaces.ts files.
   -->
  <div class="tce-container">
    <div>
      <!-- 
        Whatever you want to put into the author_data
        here needs you to set a default in manifest/src/index.ts 
      -->
      <h3>Write instructions for the students.</h3>
      <input 
        type="text" 
        v-model="element.data.author_data.instructions" 
        class="text-input"
        @change="save_author_data"
        />
    </div>
    <!-- 
      We don't technically need the button to save here,
      but it'll encourage people to click outside the input,
      which they would need to do anyway with the @change trigger. 
    -->
    <button 
      class="save-button"
      @click="save_author_data"
      >Save</button>
  </div>
</template>

<script setup lang="ts">
import { Element } from 'tce-manifest';

const props = defineProps<{ element: Element; isFocused: boolean; }>();
const emit = defineEmits(['save']);

// Currently this does not save anything but author_data.
// If you want to save other pieces of data, you'll
// need to write another emit('save') call.
const save_author_data = () => {
  console.log(JSON.stringify(props.element));  
  const { data } = props.element;
  const author_data = data.author_data;
  // The spread operator combined with the braces is a way to 
  // update the data object with the author_data.
  // It's like jQuery's $.extend() function.
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
