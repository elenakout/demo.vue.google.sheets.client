import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allNotes: [],
    activeNote: {
      title: '',
      content: '',
      category: '',
      id: null,
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

        console.log('create res:', json.data);

        console.log('update res:', json);
        state.allNotes = [...json.data];
        state.activeNote = { ...json.data[state.allNotes.length - 1] };
      } catch (error) {
        console.log(error);
      }
    },
    async UPDATE_NOTE({ state }) {
      // active note -> set title
      // active note -> set content
      try {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(state.activeNote),
        };
        const response = await fetch(`http://localhost:3000/api/v1/notes/${state.activeNote.id}`, requestOptions);
        const json = await response.json();
        console.log('update res:', json);
        state.allNotes = [...json.data];
        state.activeNote = { ...json.data[0] };
      } catch (error) {
        console.log(error);
      }
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
