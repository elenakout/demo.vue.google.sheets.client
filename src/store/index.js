import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allNotes: [],
    activeNote: {},
  },
  getters: {
    GET_ALL_NOTES() { },
    GET_ACTIVE_NOTE() { },
  },
  mutations: {
    SET_ACTIVE_NOTE() {
      // all notes find(id)
      // set state active note
    },
    SET_ACTIVE_NOTE_TITLE() { },
    SET_ACTIVE_NOTE_CONTENT() { },
  },
  actions: {
    GET_ALL_NOTES() { },
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
