<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'FormNote',
  components: {},
  data() {
    return {
      note: {},
    };
  },
  methods: {
    ...mapActions(['CREATE_NEW_NOTE', 'UPDATE_NOTE']),
    ...mapMutations(['SET_ACTIVE_NOTE', 'UPDATE_ACTIVE_NOTE']),
    saveNote() {
      if (this.activeNote.id) {
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
    ...mapState(['activeNote']),
  },
  watch: {
    activeNote(val) {
      this.note = val;
    },
  },
};
</script>

<template>
  <section class="editor">
    <form @submit.prevent="saveNote" @input="formInput">
      <div class="radio-container">
        <input
          type="radio"
          name="category"
          v-model="note.category"
          id="note"
          value="note"
        />
        <label for="note">Note</label>
        <input
          type="radio"
          name="category"
          v-model="note.category"
          id="todo"
          value="todo"
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
      <input name="title" v-model="note.title" type="text" />
      <textarea
        v-model="note.content"
        name="content"
        id="content"
        cols="30"
        rows="10"
      ></textarea>

      <button>Save Note</button>
    </form>
  </section>
</template>

<style scoped lang="scss">
.editor {
  min-height: 100vh;
  padding: 2rem 2rem 0 2rem;
}

form {
  display: grid;
  height: 100%;
  grid-auto-rows: min-content;
  gap: 0.5rem;
}

input[type='text'] {
  border: none;
  font-size: var(--fs-size-600);
  font-weight: bold;
  padding: 1rem;
  background-color: hsl(var(--clr-primary-900) / 0.001);
}

input[type='text']:focus {
  outline: none;
}

textarea {
  min-height: 72vh;
  border: none;
  font-family: Roboto;
  font-size: var(--fs-size-400);
  padding: 1rem;
  resize: none;
  background-color: hsl(var(--clr-primary-900));
}

textarea:focus {
  outline: none;
}

.radio-container {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

input[type='radio'] {
  position: fixed;
  opacity: 0;
  pointer-events: none;
}

label {
  cursor: pointer;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 1rem;
  opacity: 50%;

  line-height: 1;
  font-size: var(--fs-size-300);
  font-family: var(--ff-sans);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;

  color: hsl(var(--clr-accent-900));

  transition: all 0.2s ease-in;

  background-color: hsl(var(--clr-accent-300));
}

label:hover {
  transform: scale(1.05);
  opacity: 1;
}

input[id='todo'] + label {
  background-color: hsl(var(--clr-accent-100));
}
input[id='feature'] + label {
  background-color: hsl(var(--clr-accent-200));
}
input[id='note'] + label {
  // font-weight: bold;
  background-color: hsl(var(--clr-accent-300));
}

input[type='radio']:checked + label {
  opacity: 1;
}

button {
  cursor: pointer;
  padding: 0.8rem 0;
  font-family: var(--ff-sans);
  font-size: var(--fs-size-600);
  font-weight: bold;
  text-transform: uppercase;
  background-color: hsl(var(--clr-primary-600));
  color: hsl(var(--clr-primary-900));
  transition: all 0.3s ease-in-out;
}

button:hover {
  background-color: hsl(var(--clr-primary-400) / 0.9);
}
</style>
