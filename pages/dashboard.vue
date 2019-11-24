<template>
  <div>
    <v-app>
      <v-container>
      <h2>トピック名を入力してください。</h2>
      <hr>
      <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes, validate }">
        <v-form @submit.prevent="create">
          <ValidationProvider
            v-slot="{ errors, valid }"
            rules="required"
          >
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  v-model.trim="form.title"
                  label="トピックタイトル"
                  placeholder="タイトルを入力してください。"
                  :error-messages="errors"
                  autofocus
                  clearable
                ></v-text-field>
                <small class="form-text text-danger" v-if="serverSideErrors.title">{{ serverSideErrors.title[0] }}</small>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <v-textarea
                  v-model="form.body"
                  name="input-7-1"
                  label="トピック本文"
                  placeholder="投稿本文を入力してください。"
                  :error-messages="errors"
                  hint="投稿本文を入力"
                  clearable
                ></v-textarea>
                <small class="form-text text-danger" v-if="serverSideErrors.body">{{ serverSideErrors.body[0] }}</small>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <v-btn color="warning" dark type="submit">作成</v-btn>
              </v-col>
            </v-row>
          </ValidationProvider>
        </v-form>
      </ValidationObserver>
      <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes, validate }">
      <v-form>
        <ValidationProvider
          v-slot="{ errors, valid }"
          rules="required"
        >
          <v-text-field
            :error-messages="errors"
            :success="valid"
            label="test"
            required
          />
        </ValidationProvider>
      </v-form>
    </ValidationObserver>
    </v-container>
    </v-app>

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
      isError: false,
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length <= 20 || 'Max 20 characters',
        serverErrorsBody: errors => errors.body[0]
      },
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
       this.$router.push('/')
    }
  }
}
</script>
