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
      return state.allNotes;
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
    UPDATE_ACTIVE_NOTE(state, note) {
      state.activeNote = note;
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
        const sortedNotes = json.data.sort(
          (a, b) => new Date(b.modified) - new Date(a.modified),
        );
        state.allNotes = [...sortedNotes];
        state.activeNote = { ...sortedNotes[0] };
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
        console.log('state active note: ', state.activeNote);
        const response = await fetch('http://localhost:3000/api/v1/notes', requestOptions);
        const json = await response.json();
        console.log(json.data);
        const sortedNotes = json.data.sort(
          (a, b) => new Date(b.modified) - new Date(a.modified),
        );
        state.allNotes = [...sortedNotes];
        state.activeNote = { ...sortedNotes[0] };
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
        console.log('update note: ', state.activeNote);
        const response = await fetch(`http://localhost:3000/api/v1/notes/${state.activeNote.id}`, requestOptions);
        const json = await response.json();
        const sortedNotes = json.data.sort(
          (a, b) => new Date(b.modified) - new Date(a.modified),
        );

        state.allNotes = [...sortedNotes];
        state.activeNote = { ...sortedNotes[0] };

        console.log('json: ', json.data);
        console.log('sorted: ', sortedNotes);
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
