<script>
import { mapActions, mapMutations } from 'vuex';
import { formatDistanceToNowStrict } from 'date-fns';

export default {
  name: 'CardNote',
  props: {
    note: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(['DELETE_NOTE']),
    ...mapMutations(['SET_ACTIVE_NOTE']),
    deleteNote(id) {
      this.DELETE_NOTE(id);
    },
  },
  computed: {
    tagColor() {
      if (this.note.category === 'todo') {
        return { '--tag-color': 'var(--clr-accent-100)' };
      }
      if (this.note.category === 'feature') {
        return { '--tag-color': 'var(--clr-accent-200)' };
      }

      return { '--tag-color': 'var(--clr-accent-300)' };
    },
  },
  filters: {
    timeAgo(val) {
      return formatDistanceToNowStrict(new Date(val), { addSuffix: true });
    },
  },
};
</script>

<template>
  <article class="flex" :style="tagColor">
    <header class="flex">
      <h3 @click="SET_ACTIVE_NOTE(note.id)" class="note__title">
        {{ note.title }}
      </h3>
      <button @click="deleteNote(note.id)">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- eslint-disable max-len -->
          <path
            d="M10 18C10.2652 18 10.5196 17.8946 10.7071 17.7071C10.8946 17.5196 11 17.2652 11 17V11C11 10.7348 10.8946 10.4804 10.7071 10.2929C10.5196 10.1054 10.2652 10 10 10C9.73478 10 9.48043 10.1054 9.29289 10.2929C9.10536 10.4804 9 10.7348 9 11V17C9 17.2652 9.10536 17.5196 9.29289 17.7071C9.48043 17.8946 9.73478 18 10 18ZM20 6H16V5C16 4.20435 15.6839 3.44129 15.1213 2.87868C14.5587 2.31607 13.7956 2 13 2H11C10.2044 2 9.44129 2.31607 8.87868 2.87868C8.31607 3.44129 8 4.20435 8 5V6H4C3.73478 6 3.48043 6.10536 3.29289 6.29289C3.10536 6.48043 3 6.73478 3 7C3 7.26522 3.10536 7.51957 3.29289 7.70711C3.48043 7.89464 3.73478 8 4 8H5V19C5 19.7956 5.31607 20.5587 5.87868 21.1213C6.44129 21.6839 7.20435 22 8 22H16C16.7956 22 17.5587 21.6839 18.1213 21.1213C18.6839 20.5587 19 19.7956 19 19V8H20C20.2652 8 20.5196 7.89464 20.7071 7.70711C20.8946 7.51957 21 7.26522 21 7C21 6.73478 20.8946 6.48043 20.7071 6.29289C20.5196 6.10536 20.2652 6 20 6ZM10 5C10 4.73478 10.1054 4.48043 10.2929 4.29289C10.4804 4.10536 10.7348 4 11 4H13C13.2652 4 13.5196 4.10536 13.7071 4.29289C13.8946 4.48043 14 4.73478 14 5V6H10V5ZM17 19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8946 16.2652 20 16 20H8C7.73478 20 7.48043 19.8946 7.29289 19.7071C7.10536 19.5196 7 19.2652 7 19V8H17V19ZM14 18C14.2652 18 14.5196 17.8946 14.7071 17.7071C14.8946 17.5196 15 17.2652 15 17V11C15 10.7348 14.8946 10.4804 14.7071 10.2929C14.5196 10.1054 14.2652 10 14 10C13.7348 10 13.4804 10.1054 13.2929 10.2929C13.1054 10.4804 13 10.7348 13 11V17C13 17.2652 13.1054 17.5196 13.2929 17.7071C13.4804 17.8946 13.7348 18 14 18Z"
            fill="#DC3545"
          />
        </svg>
      </button>
    </header>
    <p class="note__content">{{ note.content }}</p>
    <footer class="flex">
      <span class="note__tag">{{ note.category }}</span>
      <p class="note__time">{{ note.modified | timeAgo }}</p>
    </footer>
  </article>
</template>

<style scoped lang="scss">
article {
  // border: 1px solid blue;
  --gap: 1rem;
  flex-direction: column;
  padding: 1rem 1.375rem;
  margin-bottom: 3px;
  overflow-wrap: break-word;

  background-color: hsl(var(--clr-white));
  // border-top: 1px solid hsl(var(--clr-primary-400));
  border-bottom: 1px solid hsl(var(--clr-primary-600) / 0.8);
}

header,
footer {
  align-items: center;
  justify-content: space-between;
}

button {
  transition: transform 0.3s ease-in;
}

button:hover {
  transform: scale(1.145);
}
.note__title {
  cursor: pointer;
  font-family: var(--ff-sans);
  font-size: var(--fs-size-600);
  font-weight: 600;
  color: hsl(var(--clr-primary-100));
}

.note__content {
  line-height: 1.2;
  font-family: var(--ff-sans);
  font-size: var(--fs-size-400);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  // white-space: pre-wrap;
}

.note__tag {
  padding: 6px 12px;
  border-radius: 14px;

  font-size: var(--fs-size-200);
  text-transform: uppercase;
  letter-spacing: 1px;

  color: hsl(var(--clr-accent-900));
  background-color: hsl(var(--tag-color));
}

.note__time {
  line-height: 1.1;
  font-weight: 400;
  font-size: var(--fs-size-300);
  color: hsl(var(--clr-grey-400));
}
</style>
