<template>
  <div class="container">
    <h2 data-test="pageTitle">Latest Topics</h2>
    <div v-for="(topic, index) in topics" :key="index" class="bg-light mt-5 mb-5" style="padding: 20px;">
      <h2>
        <nuxt-link
          :to="{name: 'topics-id', params: {id: topic.id}}"
          data-test="topicTitle"
        >
          {{topic.title}}
        </nuxt-link>
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
             @click="likeDislikePost(topic.id, content, index)">
          <span class="badge">{{content.likes_count}}</span>
        </div>
      </div>
    </div>
    <Pagination @updatePagenation="paginate"
                :length="meta.last_page"
                :page="meta.current_page"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Organisms/Pagination/Pagination'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      topics: [],
      meta: [],
    }
  },
  async asyncData({$axios}) {
    let {data, meta} = await $axios.$get(`/topics`);
    return {
      topics: data,
      meta: meta
    }
  },
  methods: {
    async paginate(pageNumber) {
      let {data, meta} = await this.$axios.$get(`/topics?page=${pageNumber}`)
      this.setData(data, meta);
      // return this.topics = {...this.topics, ...data}
    },
    async deleteTopic(id) {
      await this.$axios.$delete(`/topics/${id}`);
      this.$router.push('/');
    },
    async likeDislikePost(topicId, content, index) {
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
          if (confirm('すでにいいねされています。取り消しますか？')) {
            await this.$axios.$delete(`/topics/${topicId}/posts/${content.id}/likes/${content.likes[index].id}`)
            let {data, meta} = await this.getTopics()
            this.setData(data, meta);
            return;
          }
          return;
        }
        await this.$axios.$post(`/topics/${topicId}/posts/${content.id}/likes`);
        let {data, meta} = await this.getTopics()
        this.setData(data, meta);
      }
      return;
    },
    getTopics() {
      return this.$axios.$get(`/topics`);
    },
    setData(data, meta) {
      this.topics = data;
      this.meta = meta;
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
