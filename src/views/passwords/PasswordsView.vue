<template>
  <div class="passwords-view">
    <div class="filter">
      <p>You currently have {{ store.total }} accounts</p>
      <TheButton to="/passwords/add">Add</TheButton>
      <InputLine name="filter" v-model="filter" autofocus autocomplete="off" />
    </div>
    <p v-if="store.error" class="error">{{ store.error }}</p>
    <p v-if="store.loading">Loading passwords…</p>
    <template v-else>
      <div class="passwords">
        <div class="password" v-for="password in store.passwords" :key="password.uuid">
          <PasswordLine :password="password" />
        </div>
      </div>
      <p v-if="store.passwords.length === 0">No passwords found.</p>
      <div v-if="totalPages > 1" class="pagination">
        <span class="pagination__label pagination__label--wide">
          {{ store.page }} | {{ totalPages }}
        </span>
        <span class="pagination__label pagination__label--narrow">
          {{ store.page }} | {{ totalPages }}
        </span>
        <TheButton type="button" :disabled="store.page <= 1" @click="changePage(store.page - 1)">
          Previous
        </TheButton>
        <TheButton
          type="button"
          :disabled="store.page >= totalPages"
          @click="changePage(store.page + 1)"
        >
          Next
        </TheButton>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import InputLine from '../../components/InputLine.vue'
import PasswordLine from '../../components/PasswordLine.vue'
import TheButton from '../../components/TheButton.vue'
import { usePasswordStore } from '@/stores/passwordsStore'

const store = usePasswordStore()
const filter = ref(store.search)
const totalPages = computed(() => Math.max(1, Math.ceil(store.total / store.limit)))

let searchTimeout: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  store.fetchPasswords({ page: 1, limit: 15, search: filter.value }).catch(() => null)
})

watch(filter, (value) => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    store.fetchPasswords({ page: 1, limit: 15, search: value }).catch(() => null)
    searchTimeout = null
  }, 300)
})

onBeforeUnmount(() => {
  if (searchTimeout) clearTimeout(searchTimeout)
})

function changePage(page: number) {
  store.fetchPasswords({ page }).catch(() => null)
}
</script>

<style lang="scss">
.passwords-view {
  .filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 auto;
    padding: 0 20px;
    max-width: 600px;

    .button {
      margin: 0 0 15px 0;
      @include media('>=tablet') {
        margin: 0;
      }
    }
  }

  .error {
    color: #e74c3c;
    text-align: center;
  }

  .passwords {
    display: grid;
    margin: 25px;
    grid-template-columns: 100%;
    gap: 25px;

    @include media('>tablet', '<desktop') {
      grid-template-columns: repeat(2, 1fr);
    }

    @include media('>desktop', '<desktop-xl') {
      grid-template-columns: repeat(3, 1fr);
    }

    @include media('>desktop-xl') {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  .pagination {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    margin: 25px;

    .button {
      width: 100%;
      margin-top: 0;
    }

    &__label {
      order: -1;
      text-align: center;
    }

    &__label--wide {
      display: none;
    }

    @include media('>desktop') {
      flex-direction: row;
      align-items: center;
      justify-content: center;

      &__label {
        order: 0;
      }

      &__label--narrow {
        display: none;
      }

      &__label--wide {
        display: inline;
      }

      .button {
        width: 124px;
      }
    }
  }
}
</style>
