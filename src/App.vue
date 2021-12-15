<template>
  <div id="app" class="flex">
    <aside>
      <header>
        <h1>Open notes</h1>
      </header>
      <button @click="createNote">Add Note</button>
      <section class="notes-container">
        <article class="note" v-for="note in GET_ALL_NOTES" :key="note.id">
          <h3 @click="SET_ACTIVE_NOTE(note.id)" class="note__title">
            {{ note.title }}
          </h3>
          <p>{{ note.content }}</p>
          <p>{{ note.category }}</p>
          <p>{{ note.id }}</p>
          <p>
            modified: {{ new Date(note.lastModified).toLocaleString('el-GR') }}
          </p>
          <p>
            created: {{ new Date(note.created_at).toLocaleString('el-GR') }}
          </p>
        </article>
      </section>
    </aside>
    <main>
      <section class="display">
        <h2>display note</h2>
        <p>Id: {{ activeNote.id }}</p>
        <p>Title: {{ activeNote.title }}</p>
        <p>Content: {{ activeNote.content }}</p>
        <p>Category: {{ activeNote.category }}</p>
        <p>modified: {{ new Date(activeNote.lastModified).toDateString() }}</p>
        <p>created: {{ new Date(activeNote.created_at).toDateString() }}</p>
      </section>
      <section class="editor">
        <h2>Note editor</h2>
        <form @submit.prevent="saveNote">
          <input v-model="noteTitle" />
          <textarea
            v-model="noteContent"
            name="content"
            id="content"
            cols="30"
            rows="10"
          ></textarea>
          <div>
            <input type="radio" id="note" value="note" v-model="noteCategory" />
            <label for="note">Note</label>
            <input type="radio" id="todo" value="todo" v-model="noteCategory" />
            <label for="todo">todo</label>
            <input
              type="radio"
              id="feature"
              value="feature"
              v-model="noteCategory"
            />
            <label for="feature">Feature</label>
          </div>
          <input type="submit" value="Save Note" />
        </form>
      </section>
    </main>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: 'App',
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions([
      'FETCH_ALL_NOTES',
      'CREATE_NEW_NOTE',
      'UPDATE_NOTE',
      'DELETE_NOTE',
    ]),
    ...mapMutations([
      'SET_ACTIVE_NOTE',
      'SET_ACTIVE_NOTE_TITLE',
      'SET_ACTIVE_NOTE_CONTENT',
      'SET_ACTIVE_NOTE_ID',
      'SET_ACTIVE_NOTE_CATEGORY',
      'SET_ACTIVE_NOTE_MODIFIED',
      'SET_ACTIVE_NOTE_CREATED',
    ]),
    createNote() {
      this.SET_ACTIVE_NOTE_TITLE('Title');
      this.SET_ACTIVE_NOTE_CONTENT('New note...');
      this.SET_ACTIVE_NOTE_ID();
      this.SET_ACTIVE_NOTE_CATEGORY('note');
      this.SET_ACTIVE_NOTE_CREATED();
    },
    saveNote() {
      if (this.activeNote.id) {
        this.SET_ACTIVE_NOTE_MODIFIED();
        this.UPDATE_NOTE();
      } else {
        this.CREATE_NEW_NOTE();
      }
    },
  },
  computed: {
    ...mapState(['allNotes', 'activeNote']),
    ...mapGetters(['GET_ALL_NOTES']),
    noteTitle: {
      get() {
        return this.activeNote.title;
      },
      set(val) {
        this.SET_ACTIVE_NOTE_TITLE(val);
      },
    },
    noteContent: {
      get() {
        return this.activeNote.content;
      },
      set(val) {
        this.SET_ACTIVE_NOTE_CONTENT(val);
      },
    },
    noteCategory: {
      get() {
        return this.activeNote.category;
      },
      set(val) {
        this.SET_ACTIVE_NOTE_CATEGORY(val);
      },
    },
  },
  created() {
    this.FETCH_ALL_NOTES();
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

.notes-container {
  display: grid;
  gap: 10px;
}

.note {
  border: 1px solid blue;
  padding: 1.5rem;
}

.note__title {
  cursor: pointer;
}

main {
  border: 1px solid purple;
  flex: 2 1 auto;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.display,
.editor {
  padding: 2rem;
  display: grid;
  gap: 1rem;
}

form {
  display: grid;
  gap: 10px;
}
</style>
