<template>
  <div class="container">
    <h2>Latest Topics</h2>
    <div v-for="(topic, index) in topics" :key="index" class="bg-light mt-5 mb-5" style="padding: 20px;">
      <h2>
        <nuxt-link :to="{name: 'topics-id', params: {id: topic.id}}">{{topic.title}}</nuxt-link>
        </h2>
      <p class="text-muted">{{topic.created_at}} by {{topic.user.name}}</p>
      <div v-for="(content, index) in topic.post" :key="index" class="ml-5 content">
        {{content.body}}
        <p class="text-muted">{{content.created_at}} by {{content.user.name}}</p>
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
    console.log(links)
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
    }
  }
}
</script>

<style scoped>
  .content {
      border-left: 10px solid white;
      padding: 0 10px 0 10px;
  }
</style>
