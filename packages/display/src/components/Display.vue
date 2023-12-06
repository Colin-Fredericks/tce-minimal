<template>
  <div class="tce-root">
    <h2>{{ props.data.display_name }}</h2>
    <h2>Learner Data</h2>
    <div>
      <textarea v-model="pageOptions.text" class="text-input" @change="save_learner_data" />
    </div>
    <div>Character count: {{ char_count }}</div>
    <v-btn class="my-6" @click="save_learner_data">Save learner data</v-btn>

    <h2>Full learner state</h2>
    <div>
      <pre><code>{{ userState }}</code></pre>
    </div>
    <v-btn class="my-6" @click="update">Update learner state</v-btn>

    <h2>Author Data</h2>
    <div>
      <pre><code>{{ data.author_data }}</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElementData } from 'tce-manifest';
import { computed, reactive } from 'vue';

const props = defineProps<{ id: number; data: ElementData; userState: any }>();
const emit = defineEmits(['interaction', 'save']);

// "interaction" lets us save the user state
const update = () => emit('interaction', { id: props.id, event: 'update', learner_data: { 'text': pageOptions.text } });

const pageOptions = reactive({
  text: "Enter data here",
});

const char_count = computed(() => {
  if (!pageOptions.text) return 0;
  if (typeof pageOptions.text !== 'string') return 0;
  return pageOptions.text.length;
});

const pageLoaded = () => {

  if (!props.userState.learner_data) {
    props.userState.learner_data = {};
  } else if (!props.userState.learner_data.text) {
    pageOptions.text = "Enter data here";
  } else {
    pageOptions.text = props.userState.learner_data.text;
  }

  emit('save', { id: props.id, event: 'load' });
}

const save_learner_data = () => {
  console.log(JSON.stringify(props));
  const text = pageOptions.text;
  emit('save', { ...props.userState, text });
  emit('interaction', { id: props.id, event: 'save', learner_data: { 'text': text } });
}

pageLoaded();

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
