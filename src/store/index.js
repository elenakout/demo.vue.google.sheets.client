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
      const result = state.allNotes.find((obj) => obj.id === noteId);
      state.activeNote = { ...result };
    },
    UPDATE_ACTIVE_NOTE(state, note) {
      state.activeNote = note;
    },
    SET_NOTES(state, notes) {
      state.allNotes = [];
      const sortedNotes = notes.sort(
        (a, b) => new Date(b.modified) - new Date(a.modified),
      );
      state.allNotes = [...sortedNotes];
      state.activeNote = { ...sortedNotes[0] };
    },
  },
  actions: {
    async FETCH_ALL_NOTES({ commit }) {
      try {
        const allNotes = await fetch('http://localhost:3000/api/v1/notes', {
          method: 'GET',

        });
        const json = await allNotes.json();

        commit('SET_NOTES', json.data);
      } catch (error) {
        console.log(error);
      }
    },
    async CREATE_NEW_NOTE({ state, commit }) {
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(state.activeNote),
        };
        const response = await fetch('http://localhost:3000/api/v1/notes', requestOptions);
        const json = await response.json();
        commit('SET_NOTES', json.data);
      } catch (error) {
        console.log(error);
      }
    },
    async UPDATE_NOTE({ state, commit }) {
      try {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(state.activeNote),
        };
        const response = await fetch(`http://localhost:3000/api/v1/notes/${state.activeNote.id}`, requestOptions);
        const json = await response.json();
        commit('SET_NOTES', json.data);
      } catch (error) {
        console.log(error);
      }
    },
    async DELETE_NOTE({ commit }, id) {
      // delete note -> api/v1/notes/:id DELETE
      try {
        const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch(`http://localhost:3000/api/v1/notes/${id}`, requestOptions);
        const json = await response.json();
        commit('SET_NOTES', json.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {
  },
});
