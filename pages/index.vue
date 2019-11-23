<template>
    <div class="">
      <div class="bg jumbotron jumbotron-fluid">
        <div class="container">
          <h1 class="display-4 text-warning">Laravel API Development</h1>
          <p class="lead text-warning">Vue/Nuxt JS Web App</p>
        </div>
      </div>
      <div class="container">
        <nuxt-link to="/dashboard"><button class="btn btn-primary">投稿する</button></nuxt-link>
        <nuxt-link to="/topics"><button class="btn btn-primary">トピック一覧</button></nuxt-link>
      </div>


    </div>
</template>

<script>
export default {

}
</script>
