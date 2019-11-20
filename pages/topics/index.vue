<template>
  <div class="container">
    <h2>Latest Topics</h2>
    <div v-for="(topic, index) in topics" :key="index" class="bg-light mt-5 mb-5" style="padding: 20px;">
      <h2>{{topic.title}}</h2>
      <p class="text-muted">{{topic.created_at}} by {{topic.user.name}}</p>
      <div v-for="(content, index) in topic.post" :key="index" class="ml-5 content">
        {{content.body}}
        <p class="text-muted">{{content.created_at}} by {{content.user.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topics: []
    }
  },
  async asyncData(context) {
    let {data} = await context.$axios.$get('/topics')
    console.log(data)
    return {
      topics: data
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
