<script>
import { mapMutations } from 'vuex';

export default {
  name: 'ButtonAddNote',
  components: {},
  data() {
    return {
      note: {},
    };
  },
  methods: {
    ...mapMutations(['UPDATE_ACTIVE_NOTE']),
    createNote() {
      this.note = {
        title: 'Title',
        content: 'New note...',
        category: 'note',
        created_at: new Date(),
        modified: new Date(),
        id: null,
      };

      this.UPDATE_ACTIVE_NOTE(this.note);
    },
  },
  computed: {},
};
</script>

<template>
  <button @click="createNote">Add Note</button>
</template>

<style scoped lang="scss">
button {
  padding: 1rem 0;
  font-family: var(--ff-sans);
  font-size: var(--fs-size-600);
  font-weight: bold;
  text-transform: uppercase;
  background-color: hsl(var(--clr-primary-600));
  color: hsl(var(--clr-primary-900));
}
</style>
