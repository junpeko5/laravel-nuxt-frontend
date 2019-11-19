<template>
  <div class="container col-md-6 mt-5">
    <h2>Login</h2>
    <br>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input v-model.trim="form.email" type="email" class="form-control" placeholder="Enter email" autofocus>
        <small class="form-text text-danger" v-if="errors.email">{{ errors.email[0] }}</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input v-model.trim="form.password" type="password" class="form-control" placeholder="Password">
        <small class="form-text text-danger" v-if="errors.password">{{ errors.password[0] }}</small>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
    <br>
    <p>Don't have an account? <nuxt-link to="/register">Register</nuxt-link></p>
  </div>
</template>

<script>
export default {
  middleware: ['guest'],
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
