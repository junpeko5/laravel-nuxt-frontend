<template>
  <div class="container">
    <h2>Update Post Title</h2>
    <form @submit.prevent="update">
      <div class="form-group mt-5">
        <textarea type="text" class="form-control" v-model="post.body" rows="5"></textarea>
        <small v-if="serverSideErrors.body" class="form-text text-danger">{{serverSideErrors.body[0]}}</small>
      </div>
      <button class="btn btn-outline-success">
        Update
      </button>
    </form>
    <p class="mt-5 btn btn-outline-warning">
      <nuxt-link to="/topics">Back to topics</nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        body: ''
      }
    }
  },
  async asyncData({$axios, params}) {
    const {data} = await $axios.$get(`/topics/${params.id}/posts/${params.body}`)
    return {post: data}
  },
  methods: {
    async update({$axios}) {
      await this.$axios.$patch(`/topics/${this.$route.params.id}/posts/${this.$route.params.body}`, {
        body: this.post.body
      })
      this.$router.push(`/topics/${this.$route.params.id}`)
    }
  }
}
</script>

<style scoped>
  .content {
      border-left: 10px solid white;
      padding: 0 10px 0 10px;
  }
  .btn-outline-success,
  .btn-outline-danger {
    border: none;
  }
</style>
