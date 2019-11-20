<template>
  <div class="container">
    <h2>Latest Topics</h2>
    {{topics}}
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
    return {
      topics: data
    }
  }
}
</script>
