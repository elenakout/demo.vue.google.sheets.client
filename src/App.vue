<template>
  <div id="app" class="flex">
    <aside>
      <header>
        <h1>Open notes</h1>
      </header>
      <button-add-note></button-add-note>
      <section class="notes-container">
        <card-note
          class="note"
          v-for="note in GET_ALL_NOTES"
          :key="note.id"
          :note="note"
        ></card-note>
      </section>
    </aside>
    <main>
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
import ButtonAddNote from '@/components/ButtonAddNote.vue';
import CardNote from '@/components/CardNote.vue';

export default {
  name: 'App',
  components: {
    ButtonAddNote,
    CardNote,
  },
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
  computed: {
    ...mapState(['allNotes', 'activeNote']),
    ...mapGetters(['GET_ALL_NOTES']),
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
  max-width: 30%;
  border: 1px solid red;
  flex: 0 3 auto;
  padding: 1.5rem;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  // max-height: calc(100vh - 9rem);
  max-height: 100vh;
  overflow-y: auto;

  // position: fixed;
  // overflow-y: scroll;
  // top: 0;
  // bottom: 0;
}

.notes-container {
  display: grid;
  gap: 10px;
}

main {
  max-height: 100vh;
  border: 1px solid purple;
  flex: 2 1 auto;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.display {
  white-space: pre-wrap;
  max-height: 50vh;
  overflow-y: auto;
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
