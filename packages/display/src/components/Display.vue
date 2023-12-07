<template>
  <div class="tce-root">
    <!-- 
      Everything in props.data is set on the authoring side.
      The display_name is set in the side toolbar. 
    -->
    <h2>{{ props.data.display_name }}</h2>

    <h3>Instructions</h3>
    <!-- This is set on the authoring side, in the main editing area. -->
    <p>{{ props.data.author_data.instructions }}</p>

    <h3>Learner Data</h3>
    <div>
      <!-- 
        pageOptions is our temporary storage area for variables.
        We can't use props.data directly because it's read-only,
        and we wouldn't be able to save our changes to it.
       -->
      <textarea 
        v-model="pageOptions.text" 
        class="text-input" 
        @change="save_learner_data" />
    </div>
    <!-- Character count is calculated in the javascript. -->
    <div>Character count: {{ char_count }}</div>
    <v-btn 
      class="my-6" 
      @click="save_learner_data"
    >Save learner data</v-btn>

    <h2>Full learner state</h2>
    <!-- 
      This is just here for testing. 
      You're going to want to remove it before real use.
    -->
    <div>
      <pre><code>{{ userState }}</code></pre>
    </div>
    <v-btn class="my-6" @click="update">Update learner state</v-btn>

    <!-- Same here - testing purposes only. -->
    <h2>Author Data</h2>
    <div>
      <pre><code>{{ data.author_data }}</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElementData } from 'tce-manifest';
import { computed, reactive } from 'vue';

const props = defineProps<{ 
    id: number; 
    data: ElementData; 
    userState: any 
  }>();
const emit = defineEmits(['interaction', 'save']);

// The "interaction" emit lets us save the user state.
// We're referring to this as an "update" event for the logs.
const update = () => emit('interaction', { 
  id: props.id, 
  event: 'update', 
  learner_data: { 'text': pageOptions.text } 
});

// This is our temporary storage area for variables.
// We have to make this object because we 
// can't store things in props.data (it's read-only).
// This reactive() function is *not* read-only, despite being a const.
const pageOptions = reactive({
  text: "Enter data here",
});

// This is an example of a computed property,
// which is a variable that is calculated based on other variables.
// You need to explicitly use computed() for such things.
const char_count = computed(() => {
  if (!pageOptions.text) return 0;
  if (typeof pageOptions.text !== 'string') return 0;
  return pageOptions.text.length;
});

// This is where we create or reset learner state as they load the TE.
// If we have no data, we initialize to default values.
// If we have data, we use that instead.
const pageLoaded = () => {
  if (!props.userState.learner_data) {
    props.userState.learner_data = {};
  } else if (!props.userState.learner_data.text) {
    pageOptions.text = "Enter data here";
  } else {
    pageOptions.text = props.userState.learner_data.text;
  }

  // Calling this to log the fact that the TE loaded.
  emit('save', { id: props.id, event: 'load' });
}

const save_learner_data = () => {
  console.log(JSON.stringify(props));
  const text = pageOptions.text;
  // We save learner info to props.userState,
  // instead of props.data like we would on the authoring side.
  emit('save', { ...props.userState, text });
  emit('interaction', { id: props.id, event: 'save', learner_data: { 'text': text } });
}

// Calling pageLoaded() when the page, um, loads.
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
