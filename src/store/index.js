import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allNotes: [],
    activeNote: {
      title: 'New Note',
    },
    error: null,
  },
  getters: {
    ALL_NOTES() { },
    ACTIVE_NOTE() { },
  },
  mutations: {
    SET_ACTIVE_NOTE(state, id) {
      // all notes find(id)
      // set state active note
      state.activeNote = { ...state.allNotes[id] };
    },
    SET_ACTIVE_NOTE_TITLE() { },
    SET_ACTIVE_NOTE_CONTENT() { },
  },
  actions: {
    async GET_ALL_NOTES({ state }) {
      state.allNotes = [];
      try {
        const allNotes = await fetch('http://localhost:3000/api/v1/notes', {
          method: 'GET',

        });
        const json = await allNotes.json();

        state.allNotes = [...json.data];
        state.activeNote = { ...json.data[0] };
      } catch (error) {
        console.log(error);
      }
    },
    CREATE_NEW_NOTE() {
      // set active note
      /*
        note = {
          title: new note,
          content: new content,
          lastmodified: now, created_at: now,
          category: note
        }
      */
      // save note -> api/v1/notes POST
      // GET_ALL_NOTES()
    },
    UPDATE_NOTE() {
      // active note -> set title
      // active note -> set content
    },
    SAVE_NOTE() {
      // last modified -> Date.now
      // update note ->  api/v1/notes/:id PATCH
    },
    DELETE_NOTE() {
      // delete note -> api/v1/notes/:id DELETE
    },
  },
  modules: {
  },
});
