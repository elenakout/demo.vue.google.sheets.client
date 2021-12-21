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
          <p>modified: {{ new Date(note.modified).toLocaleString('el-GR') }}</p>
          <p>
            created: {{ new Date(note.created_at).toLocaleString('el-GR') }}
          </p>
          <p>{{ note.modified | time }}</p>
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
        <p>modified: {{ new Date(activeNote.modified).toDateString() }}</p>
        <p>created: {{ new Date(activeNote.created_at).toDateString() }}</p>
        <p>{{ timeAgo }}</p>
      </section>
      <section class="editor">
        <h2>Note editor</h2>
        <form @submit.prevent="saveNote" @input="formInput">
          <input name="title" v-model="note.title" />
          <textarea
            v-model="note.content"
            name="content"
            id="content"
            cols="30"
            rows="10"
          ></textarea>
          <div>
            <input
              type="radio"
              id="note"
              value="note"
              name="category"
              v-model="note.category"
            />
            <label for="note">Note</label>
            <input
              type="radio"
              name="category"
              id="todo"
              value="todo"
              v-model="note.category"
            />
            <label for="todo">todo</label>
            <input
              name="category"
              type="radio"
              id="feature"
              value="feature"
              v-model="note.category"
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
    return {
      note: {},
    };
  },
  methods: {
    ...mapActions([
      'FETCH_ALL_NOTES',
      'CREATE_NEW_NOTE',
      'UPDATE_NOTE',
      'DELETE_NOTE',
    ]),
    ...mapMutations(['SET_ACTIVE_NOTE', 'UPDATE_ACTIVE_NOTE']),
    createNote() {
      this.note = {
        title: 'Title',
        content: 'New note...',
        category: 'note',
        created_at: new Date(),
        modified: new Date(),
        id: null,
      };

      this.UPDATE_ACTIVE_NOTE(this.note);
      // this.SET_ACTIVE_NOTE_TITLE('Title');
      // this.SET_ACTIVE_NOTE_CONTENT('New note...');
      // this.SET_ACTIVE_NOTE_ID();
      // this.SET_ACTIVE_NOTE_CATEGORY('note');
      // this.SET_ACTIVE_NOTE_CREATED();
    },
    saveNote() {
      if (this.activeNote.id) {
        // this.SET_ACTIVE_NOTE_MODIFIED();
        this.UPDATE_NOTE();
      } else {
        this.CREATE_NEW_NOTE();
      }
    },
    formInput() {
      this.note.modified = new Date();
      this.UPDATE_ACTIVE_NOTE(this.note);
    },
  },
  filters: {
    time(val) {
      const now = new Date();
      const timeNote = new Date(val);

      const diff = now.getTime() - timeNote.getTime();

      const mins = Math.round(diff / 1000 / 60);
      const hours = Math.round(mins / 60);
      const days = Math.round(hours / 24);

      if (mins < 60) {
        return `Last update ${mins} mins ago`;
      }
      if (hours < 24) {
        return `Last update ${hours} hours ago`;
      }
      return `Last update ${days} days ago`;
    },
  },
  computed: {
    ...mapState(['allNotes', 'activeNote']),
    ...mapGetters(['GET_ALL_NOTES']),
    timeAgo() {
      // get time difference between two timestamps
      // const before = new Date('February 1 2019 7:30:59');
      const now = new Date();
      const timeNote = new Date(this.activeNote.modified);

      const diff = now.getTime() - timeNote.getTime();

      const mins = Math.round(diff / 1000 / 60);
      const hours = Math.round(mins / 60);
      const days = Math.round(hours / 24);

      if (mins < 60) {
        return `Last update ${mins} mins ago`;
      }
      if (hours < 24) {
        return `Last update ${hours} hours ago`;
      }
      return `Last update ${days} days ago`;
    },
  },
  created() {
    this.FETCH_ALL_NOTES();
  },
  watch: {
    activeNote(val) {
      this.note = val;
    },
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

  // position: fixed;
  // overflow-y: scroll;
  // top: 0;
  // bottom: 0;
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
