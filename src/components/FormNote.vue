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
}

form {
  padding: 2rem;
  display: grid;
  height: 100%;
  grid-auto-rows: min-content;
  gap: 1rem;
}

input[type='text'] {
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem;
}

textarea {
  min-height: 70vh;
  border: none;
  font-family: Roboto;
  font-size: 1rem;
  padding: 1rem;
  resize: none;
}

.radio-container {
  display: flex;
  gap: 15px;
}

input[type='radio'] {
  position: fixed;
  opacity: 0;
  pointer-events: none;
}

input[type='radio']:checked + label {
  font-weight: bold;
  border: 2px solid rgb(17, 110, 22);
  color: rgb(17, 110, 22);
}

label {
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  border: 1px solid gray;
  font-size: 14px;
  font-family: Roboto;
  cursor: pointer;
}
</style>
