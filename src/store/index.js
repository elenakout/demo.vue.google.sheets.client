import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allNotes: [],
    activeNote: {},
    error: null,
  },
  getters: {
    GET_ALL_NOTES(state) {
      return state.allNotes.sort(
        (a, b) => new Date(b.lastModified) - new Date(a.lastModified),
      );
    },
    ACTIVE_NOTE() { },
  },
  mutations: {
    SET_ACTIVE_NOTE(state, noteId) {
      // all notes find(id)
      // set state active note
      const result = state.allNotes.find((obj) => obj.id === noteId);
      state.activeNote = { ...result };
    },
    SET_ACTIVE_NOTE_TITLE(state, payload) {
      state.activeNote.title = payload;
    },
    SET_ACTIVE_NOTE_CONTENT(state, payload) {
      state.activeNote.content = payload;
    },
    SET_ACTIVE_NOTE_ID(state) {
      state.activeNote.id = null;
    },
    SET_ACTIVE_NOTE_CATEGORY(state, payload) {
      state.activeNote.category = payload;
    },
    SET_ACTIVE_NOTE_CREATED(state) {
      state.activeNote.created_at = Date.now();
      state.activeNote.lastModified = Date.now();
    },
    SET_ACTIVE_NOTE_MODIFIED(state) {
      state.activeNote.lastModified = Date.now();
    },
  },
  actions: {
    async FETCH_ALL_NOTES({ state }) {
      state.allNotes = [];
      try {
        const allNotes = await fetch('http://localhost:3000/api/v1/notes', {
          method: 'GET',

        });
        const json = await allNotes.json();
        state.allNotes = [...json.data];
        state.activeNote = { ...json.data[json.results - 1] };
      } catch (error) {
        console.log(error);
      }
    },
    async CREATE_NEW_NOTE({ state }) {
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

      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(state.activeNote),
        };
        const response = await fetch('http://localhost:3000/api/v1/notes', requestOptions);
        const json = await response.json();
        console.log(json.data);
        state.allNotes = [...json.data];
        state.activeNote = { ...json.data[json.results - 1] };
      } catch (error) {
        console.log(error);
      }
    },
    async UPDATE_NOTE({ state }) {
      try {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(state.activeNote),
        };
        const response = await fetch(`http://localhost:3000/api/v1/notes/${state.activeNote.id}`, requestOptions);
        const json = await response.json();
        state.allNotes = [...json.data];
        state.activeNote = { ...json.data[json.results - 1] };
      } catch (error) {
        console.log(error);
      }
    },
    DELETE_NOTE() {
      // delete note -> api/v1/notes/:id DELETE
    },
  },
  modules: {
  },
});
