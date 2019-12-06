<template>
  <div>
    <v-container>
      <h2>ログイン</h2>
      <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes, validate }">
        <v-form @submit.prevent="passes(login)">
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <ValidationProvider
                v-slot="{ errors, valid }"
                rules="required"
                name="メールアドレス"
              >
                <v-text-field
                  v-model.trim="form.email"
                  label="メールアドレス"
                  placeholder="メールアドレスを入力してください。"
                  :error-messages="errors"
                  :success="valid"
                  autofocus
                  clearable
                ></v-text-field>
                <small v-if="serverSideErrors.email" class="form-text text-danger">
                  {{serverSideErrors.email[0]}}
                </small>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <ValidationProvider
                v-slot="{ errors, valid }"
                rules="required"
                name="パスワード"
              >
                <v-text-field
                  type="password"
                  v-model.trim="form.password"
                  label="パスワード"
                  placeholder="パスワードを入力してください。"
                  :error-messages="errors"
                  :success="valid"
                  clearable
                ></v-text-field>
                <small v-if="serverSideErrors.password" class="form-text text-danger">
                  {{serverSideErrors.password[0]}}
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
              >ログイン</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </ValidationObserver>
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-btn
            type="button"
          >
          <nuxt-link to="/register">
            新規アカウント作成はこちら
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
  middleware: ['guest'],
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      await this.$auth.loginWith("local", {
        data: this.form
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
