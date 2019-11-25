<template>
  <div>
    <div class="container">
    <div class="bg-light mt-5 mb-5" style="padding: 20px;">
      <h2 class="display-3">
        {{topic.title}}
      </h2>
      <p class="text-muted">{{topic.created_at}} by {{topic.user.name}}</p>
      <div v-for="(content, index) in topic.post" :key="index" class="ml-5 content">
        <p>{{content.body}}</p>
        <div v-if="$auth.loggedIn">
          <div v-if="$auth.user.id === content.user.id">
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
  </div>
    <v-container>
      <h2>トピック投稿</h2>
      <hr>
      <div v-if="$auth.loggedIn">
        <b>Add a new Post</b>
        <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes, validate }">
          <v-form @submit.prevent="passes(create)">
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <ValidationProvider
                  v-slot="{ errors, valid }"
                  rules="required"
                  name="投稿"
                >
                  <v-textarea
                    v-model="body"
                    label="投稿本文"
                    placeholder="投稿本文を入力してください。"
                    :error-messages="errors"
                    :success="valid"
                    hint="投稿本文を入力"
                    clearable
                  ></v-textarea>
                  <small class="form-text text-danger" v-if="serverSideErrors.body">
                    {{ serverSideErrors.body[0] }}
                    </small>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <v-btn
                  color="warning"
                  dark
                  type="submit"
                  :disabled="invalid"
                >作成</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </ValidationObserver>
      </div>
    </v-container>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  middleware: [
    'auth'
  ],
  components: {
    ValidationObserver,
    ValidationProvider
  },
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
