<template>
  <div class="container">
    <div class="bg-light mt-5 mb-5" style="padding: 20px;">
      <h2 class="display-3">
        {{topic.title}}
      </h2>
      <div v-if="authenticated">
        <div v-if="user.id === topic.user.id">
          <nuxt-link :to="{name: 'topics-edit', params: {id: topic.id}}">
            <button class="btn btn-outline-success fas fa-edit fas-2x float-right"></button>
          </nuxt-link>
        </div>
      </div>
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
      topic: '',
    }
  },
  async asyncData({$axios, params}) {
    const {data} = await $axios.$get(`/topics/${params.id}`)
    return {
      topic: data
    }
  }
}
</script>
