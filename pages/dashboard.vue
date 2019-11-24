<template>
  <div>
    <v-app>
      <v-container>
      <h2>トピック名を入力してください。</h2>
      <hr>
      <v-form @submit.prevent="create">
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                v-model.trim="form.title"
                label="トピックタイトル"
                placeholder="タイトルを入力してください。"
                autofocus
                clearable
                :rules="[rules.required]"
              ></v-text-field>
              <small class="form-text text-danger" v-if="errors.title">{{ errors.title[0] }}</small>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <v-textarea
                v-model="form.body"
                name="input-7-1"
                label="トピック本文"
                placeholder="投稿本文を入力してください。"
                hint="投稿本文を入力"
                clearable
                :rules="[rules.required]"
              ></v-textarea>
              <small class="form-text text-danger" v-if="errors.body">{{ errors.body[0] }}</small>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <v-btn color="warning" dark type="submit">作成</v-btn>
            </v-col>
          </v-row>
      </v-form>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  middleware: [
    'auth'
  ],
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
