<template>
  <div id="app" class="flex">
    <aside>
      <header>
        <h1>Open notes</h1>
        <button>Add Note</button>
        <section class="cards-container">
          <article class="card">
            <h3>Title</h3>
            <p>content</p>
            <p>category</p>
            <p>last modified</p>
          </article>
        </section>
      </header>
    </aside>
    <main>
      <section class="display">
        <h2>display note</h2>
      </section>
      <section class="editor">
        <h2>Note editor</h2>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
};
</script>

<style lang="scss">
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
  gap: var(--gap, 1rem);
}

aside {
  border: 1px solid red;
  flex: 0 1 auto;
}

main {
  border: 1px solid purple;
  flex: 2 1 auto;
}

.card {
  border: 1px solid blue;
}
</style>
