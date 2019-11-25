<template>
  <div class="container">
    <v-container>
      <h2>投稿</h2>
      <hr>
      <div v-if="$auth.loggedIn">
        <b>新しい投稿を追加する</b>
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
                    v-model="post.body"
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
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-btn
            type="button"
          >
          <nuxt-link to="/topics">
            トピック一覧に戻る
            </nuxt-link>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
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
