<template>
  <div id="app" class="flex">
    <aside>
      <header>
        <h1>Open notes</h1>
      </header>
      <button-add-note></button-add-note>
      <section class="notes-container">
        <card-note
          class="note"
          v-for="note in GET_ALL_NOTES"
          :key="note.id"
          :note="note"
        ></card-note>
      </section>
    </aside>
    <main>
      <form-note></form-note>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ButtonAddNote from '@/components/ButtonAddNote.vue';
import CardNote from '@/components/CardNote.vue';
import FormNote from '@/components/FormNote.vue';

export default {
  name: 'App',
  components: {
    ButtonAddNote,
    CardNote,
    FormNote,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(['FETCH_ALL_NOTES']),
  },
  computed: {
    ...mapGetters(['GET_ALL_NOTES']),
  },
  created() {
    this.FETCH_ALL_NOTES();
  },
};
</script>

<style lang="scss">
/*** Costume Properties ***/
:root {
  /** Colors **/
  --hue-primary: 263;
  --hue-accent: 83;

  --clr-primary-100: var(--hue-primary) 84% 10%;
  --clr-primary-300: var(--hue-primary) 84% 30%;
  --clr-primary-600: var(--hue-primary) 84% 60%;
  --clr-primary-900: var(--hue-primary) 84% 95%;

  --clr-accent-100: var(--hue-accent) 84% 10%;
  --clr-accent-200: var(--hue-accent) 84% 20%;
  --clr-accent-300: var(--hue-accent) 84% 30%;
  --clr-accent-900: var(--hue-accent) 84% 90%;

  --clr-grey-400: var(--hue-primary) 7% 40%;
  --clr-red: 354 70% 54%;

  /** Typography **/
  --ff-serif: 'Noto Serif', serif;
  --ff-cursive: 'Righteous', cursive;
  --ff-sans: 'Roboto', sans-serif;

  --fs-size-900: 2.25rem;
  --fs-size-800: 2.25rem;
  --fs-size-600: 1.25rem;
  --fs-size-400: 1rem;
  --fs-size-300: 0.875rem;
  --fs-size-200: 0.625rem;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1;
}

html {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height, or 125% */

  color: #000000;
}

a {
  text-decoration: none;
}

ul {
  list-style: none;
}

.uppercase {
  text-transform: uppercase;
}

.flex {
  display: flex;
  gap: var(--gap, 3px);
}

aside {
  max-width: 30%;
  // border: 1px solid red;
  flex: 0 3 auto;
  // padding: 1.5rem;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  // max-height: calc(100vh - 9rem);
  // max-height: 100vh;
  // overflow-y: auto;

  // position: fixed;
  // overflow-y: scroll;
  // top: 0;
  // bottom: 0;
}

.notes-container {
  display: grid;
  gap: 3px;

  max-height: 85vh;
  overflow-y: auto;
}

main {
  max-height: 100vh;
  // border: 1px solid purple;
  flex: 2 1 auto;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.display {
  white-space: pre-wrap;
  max-height: 50vh;
  overflow-y: auto;
}
</style>
