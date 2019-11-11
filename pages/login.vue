<template>
  <div class="container col-md-6 mt-5">
    <h2>Login</h2>
    <br>
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" placeholder="Enter email">
        <small id="emailHelp" class="form-text text-danger">Show errors here</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" placeholder="Password">
        <small id="emailHelp" class="form-text text-danger">Show errors here</small>
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
    <br>
    <p>Don't have an account? <nuxt-link to="/register">Register</nuxt-link></p>
  </div>
</template>
