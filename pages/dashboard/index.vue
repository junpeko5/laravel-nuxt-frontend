<template>
  <div>
    <v-container>
      <h2 data-test="pageTitle">トピック投稿</h2>
      <hr>
      <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes, validate }">
        <v-form @submit.prevent="passes(create)">
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <ValidationProvider
                v-slot="{ errors, valid }"
                rules="required|max:10"
                name="タイトル"
              >
                <v-text-field
                  v-model.trim="form.title"
                  label="トピックタイトル"
                  placeholder="タイトルを入力してください。"
                  :error-messages="errors"
                  :success="valid"
                  autofocus
                  clearable
                  data-test="titleInput"
                ></v-text-field>
                <small class="form-text text-danger" v-if="serverSideErrors.title">{{ serverSideErrors.title[0] }}</small>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <ValidationProvider
                v-slot="{ errors, valid }"
                rules="required"
                name="投稿本文"
              >
                <v-textarea
                  v-model="form.body"
                  label="トピック本文"
                  placeholder="投稿本文を入力してください。"
                  :error-messages="errors"
                  :success="valid"
                  hint="投稿本文を入力"
                  clearable
                  data-test="bodyInput"
                ></v-textarea>
                <small class="form-text text-danger" v-if="serverSideErrors.body">{{ serverSideErrors.body[0] }}</small>
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
                data-test="createButton"
              >作成</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </ValidationObserver>
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
      form: {
        title: '',
        body: ''
      },
      isError: false
    }
  },
  methods: {
    async create() {
      await this.$axios.$post('/topics', this.form)
      .catch(err => {
        this.isError = true;
      })
      if (this.isError) {
        this.$router.push('/dashboard');
        return;
      }
       this.$router.push('/topics');
    }
  }
}
</script>
