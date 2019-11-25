<template>
  <div>
    <v-container>
      <h2>ログイン</h2>
      <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes, validate }">
        <v-form @submit.prevent="passes(register)">
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <ValidationProvider
                v-slot="{ errors, valid }"
                rules="required"
                name="名前"
              >
                <v-text-field
                  v-model.trim="form.name"
                  label="名前"
                  placeholder="名前を入力してください。"
                  :error-messages="errors"
                  :success="valid"
                  autofocus
                  clearable
                ></v-text-field>
                <small v-if="serverSideErrors.name" class="form-text text-danger">
                  {{serverSideErrors.name[0]}}
                </small>
              </ValidationProvider>
            </v-col>
          </v-row>
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
              >登録</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </ValidationObserver>
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-btn
            type="button"
          >
          <nuxt-link to="/login">
           ログインはこちら
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
        name: '',
        password: '',
      },
      isError: false
    }
  },
  methods: {
    async register() {
      await this.$axios.$post('register', this.form)
      .catch(err => {
        this.isError = true;
      })

      if (this.isError) {
        this.$router.push('/register')
        return;
      }

      this.login()
    },
    async login() {
      await this.$auth.loginWith('local', {
        data: {
          email: this.form.email,
          password: this.form.password
        }
      })
      this.$router.push('/')
    }
  }
}
</script>
