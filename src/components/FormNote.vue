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
</template>

<style scoped lang="scss"></style>
