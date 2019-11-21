<template>
  <div class="container">
    <div class="bg-light mt-5 mb-5" style="padding: 20px;">
      <h2 class="display-3">
        {{topic.title}}
      </h2>
      <p class="text-muted">{{topic.created_at}} by {{topic.user.name}}</p>
      <div v-for="(content, index) in topic.post" :key="index" class="ml-5 content">
        <p>{{content.body}}</p>
        <div v-if="authenticated">
          <div v-if="user.id === content.user.id">
            <nuxt-link :to="{name: 'topics-posts-edit', params: {id: $route.params.id,body: content.id}}">
              <button class="btn btn-outline-success fas fa-edit fa-lg float-right"></button>
            </nuxt-link>
            <button @click="deletePost(content.id)"
                    class="btn btn-outline-danger far fa-trash-alt fa-lg float-right"></button>
          </div>
        </div>
        <p class="text-muted">{{content.created_at}} by {{content.user.name}}</p>
      </div>
    </div>
    <div class="mt-5 ml-5" v-if="authenticated">
      <form @submit.prevent="create">
        <div class="form-group">
          <label for="">
            <b>Add a new Post</b>
          </label>
          <textarea
          class="form-control"
          placeholder="write something..."
          v-model="body"></textarea>
          <small v-if="errors.body"
                class="form-text text-danger">
            {{ errors.body[0] }}
          </small>
        </div>
        <button class="btn btn-outline-primary">
          Add a new post
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topic: '',
    }
  },
  async asyncData({$axios, params}) {
    const {data} = await $axios.$get(`/topics/${params.id}`)
    return {
      topic: data,
      body: ''
    }
  },
  methods: {
    async create() {
      await this.$axios.post(`/topics/${this.$route.params.id}/posts`, {
        body: this.body
      })
      this.$router.push('/topics');
    },
    async deletePost(id) {
      await this.$axios.$delete(`/topics/${this.$route.params.id}/posts/${id}`)
      this.$router.push('/topics');
    }
  }
}
</script>
