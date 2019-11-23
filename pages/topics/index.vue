<template>
  <div class="container">
    <h2>Latest Topics</h2>
    <div v-for="(topic, index) in topics" :key="index" class="bg-light mt-5 mb-5" style="padding: 20px;">
      <h2>
        <nuxt-link :to="{name: 'topics-id', params: {id: topic.id}}">{{topic.title}}</nuxt-link>
      </h2>
      <div v-if="$auth.loggedIn">
        <div v-if="$auth.user.id === topic.user.id">
          <nuxt-link :to="{name: 'topics-edit', params: {id: topic.id}}">
            <button class="btn btn-outline-success fas fa-edit fa-lg float-right"></button>
          </nuxt-link>
          <button @click="deleteTopic(topic.id)" class="btn btn-outline-danger far fa-trash-alt fa-lg float-right"></button>
        </div>
      </div>
      <p class="text-muted">{{topic.created_at}} by {{topic.user.name}}</p>
      <div v-for="(content, index) in topic.post" :key="index" class="ml-5 content">
        {{content.body}}
        <p class="text-muted">{{content.created_at}} by {{content.user.name}}</p>
        <div class="btn btn-outline-primary far fa-thumbs-up fa-lg ml-5 mb-2"
             @click="likePost(topic.id, content)">
          <span class="badge">{{content.likes_count}}</span>
        </div>
      </div>
    </div>
    <nav>
      <ul class="pagination justify-content-center">
        <li v-for="(value, key) in links" :key="key" class="page-item">
          <a v-if="value" @click="paginate(value)" href="#" class="page-link">{{key}}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topics: [],
      links: []
    }
  },
  async asyncData({$axios}) {
    let {data, links} = await $axios.$get('/topics')
    return {
      topics: data,
      links: links
    }
  },
  methods: {
    async paginate(value) {
      let {data, links} = await this.$axios.$get(value)
      this.topics = data;
      this.links = links;
      // return this.topics = {...this.topics, ...data}
    },
    async deleteTopic(id) {
      await this.$axios.$delete(`/topics/${id}`);
      this.$router.push('/');
    },
    async likePost(topicId, content) {
      const userFromVuex = this.$auth.user;
      if (!userFromVuex) {
        alert('ログインしてください。')
        this.$router.push('/login')
        return;
      }
      // can't like your own post
      if (userFromVuex.id === content.user.id) {
        alert("ご自身の投稿はいいねできません。")
        return;
      }
      // if user have aleady liked
      if (content.users) {
        if (content.users.some(user => user.id === userFromVuex.id)) {
          alert('すでにいいねされています。')
          return;
        }
        await this.$axios.$post(`/topics/${topicId}/posts/${content.id}/likes`);
        let {data, links} = await this.$axios.$get(`/topics`);
        this.topics = data;
        this.links = links;
      }
      return;
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
