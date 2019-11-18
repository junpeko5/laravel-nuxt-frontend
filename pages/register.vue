<template>
  <div class="container col-md-6 mt-5">
    <h2>Register</h2>
    <br>
    <form @submit.prevent="submit">
      <div class="form-group">
        <label for="fullname">Full Name</label>
        <input v-model.trim="form.name" type="text" class="form-control" placeholder="Enter Full Name" autofocus>
        <small id="emailHelp" class="form-text text-danger" v-if="errors.name">{{ errors.name[0] }}</small>
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input v-model.trim="form.email" type="email" class="form-control" placeholder="Enter email">
        <small id="emailHelp" class="form-text text-danger" v-if="errors.email">{{ errors.email[0] }}>{{ errors.email[0] }}</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input v-model.trim="form.password" type="password" class="form-control" placeholder="Password">
        <small id="emailHelp" class="form-text text-danger" v-if="errors.password">{{ errors.password[0] }}>{{ errors.password[0] }}</small>
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
    <br>
    <p>Already have an account? <nuxt-link to="/login">Login</nuxt-link></p>
  </div>
</template>

<script>
export default {
  middleware: ['guest'],
  data() {
    return {
      form: {
        email: '',
        name: '',
        password: '',
      }
    }
  },
  methods: {
      async submit() {
        await this.$axios.$post('register', this.form)
        await this.$auth.loginWith('local', {
          data: {
            email: this.form.email,
            password: this.form.password
          }
        })
      }
    }
}
</script>
