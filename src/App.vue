<template>
  <div id="app" class="flex">
    <aside>
      <header>
        <h1>Open notes</h1>
      </header>
      <button>Add Note</button>
      <section class="notes-container">
        <article class="note" v-for="note in allNotes" :key="note.id">
          <h3 @click="SET_ACTIVE_NOTE(note.id)" class="note__title">
            {{ note.title }}
          </h3>
          <p>{{ note.content }}</p>
          <p>{{ note.category }}</p>
          <p>{{ note.id }}</p>
        </article>
      </section>
    </aside>
    <main>
      <section class="display">
        <h2>display note</h2>
        <p>{{ activeNote.title }}</p>
      </section>
      <section class="editor">
        <h2>Note editor</h2>
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  name: 'App',
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions([
      'GET_ALL_NOTES',
      'CREATE_NEW_NOTE',
      'UPDATE_NOTE',
      'SAVE_NOTE',
      'DELETE_NOTE',
    ]),
    ...mapMutations([
      'SET_ACTIVE_NOTE',
      'SET_ACTIVE_NOTE_TITLE',
      'SET_ACTIVE_NOTE_CONTENT',
    ]),
  },
  computed: {
    ...mapState(['allNotes', 'activeNote']),
  },
  created() {
    this.GET_ALL_NOTES();
  },
};
</script>

<style lang="scss">
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1;
}

html {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height, or 125% */

  color: #000000;
}

a {
  text-decoration: none;
}

ul {
  list-style: none;
}

.uppercase {
  text-transform: uppercase;
}

.flex {
  display: flex;
  gap: var(--gap, 1rem);
}

aside {
  border: 1px solid red;
  flex: 0 1 auto;
  padding: 1.5rem;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

main {
  border: 1px solid purple;
  flex: 2 1 auto;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.note {
  border: 1px solid blue;
  padding: 1.5rem;
}

.note__title {
  cursor: pointer;
}
</style>
