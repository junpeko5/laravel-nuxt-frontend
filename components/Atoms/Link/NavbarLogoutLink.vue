<template v-if="$auth.loggedIn">
  <a @click.prevent="logout" class="nav-link logout-link">Logout</a>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$auth.logout()
    }
  }
}
</script>

<style scoped>
.logout-link {
  cursor: pointer;
}
</style>
