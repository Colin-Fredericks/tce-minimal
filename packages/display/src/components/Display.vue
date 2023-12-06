<template>
  <div class="tce-root">
    <p>This is the new Display version of the content element {{ id }}</p>
    <v-btn class="my-6" @click="submit">Update user state</v-btn>
    <div>User state: {{ userState }}</div>
    <h2>Learner Data</h2>
    <div>
      <input 
        type="text" 
        v-model="data.learner_data.text" 
        class="text-input"
        @change="save_learner_data"
        />
    </div>
    <v-btn class="my-6" @click="save_learner_data">Save learner data</v-btn>
    <div><pre><code>{{ data.learner_data }}</code></pre></div>
    <h2>Author Data</h2>
    <div><pre><code>{{ data.author_data }}</code></pre></div>
  </div>
</template>

<script setup lang="ts">
import { ElementData } from 'tce-manifest';

const props = defineProps<{ id: number; data: ElementData; userState: any }>();
const emit = defineEmits(['interaction', 'save']);

const submit = () => emit('interaction', { id: props.id });

const save_learner_data = () => {
  const { data } = props;
  const learner_data = data.learner_data;
  console.log(learner_data);
  emit('save', { ...data, learner_data });
};
</script>

<style scoped>
.tce-root {
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
