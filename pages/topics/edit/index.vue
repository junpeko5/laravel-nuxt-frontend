<template>
  <div>
    <v-container>
    <h2>トピックタイトルの編集</h2>
      <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes, validate }">
        <v-form @submit.prevent="passes(update)">
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <ValidationProvider
                v-slot="{ errors, valid }"
                rules="required|max:10"
                name="タイトル"
              >
                <v-text-field
                  v-model.trim="topic.title"
                  label="トピックタイトル"
                  placeholder="タイトルを入力してください。"
                  :error-messages="errors"
                  :success="valid"
                  autofocus
                  clearable
                ></v-text-field>
                <small v-if="serverSideErrors.title" class="form-text text-danger">{{serverSideErrors.title[0]}}</small>
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
              >更新</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </ValidationObserver>
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
  middleware: [
    'auth'
  ],
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      topic: {
        title: ''
      }
    }
  },
  async asyncData({$axios, params}) {
    const {data} = await $axios.$get(`/topics/${params.id}`)
    return {topic: data}
  },
  methods: {
    async update() {
      await this.$axios.patch(`/topics/${this.$route.params.id}`, {
        title: this.topic.title
      })
      this.$router.push('/topics')
    }
  }
}
</script>
