<template>
  <div class="uk-section uk-margin-auto uk-height-viewport" style="max-width: 640px;">
    <h2>Login</h2>
    <form>
      <fieldset class="uk-fieldset">
        <div class="uk-margin">
          <input
            id="email"
            type="email"
            placeholder="Username"
            class="uk-input uk-form-large"
            v-model="email" required autofocus
          />
        </div>
        <div class="uk-margin">
          <div>
            <input
              id="password"
              type="password"
              placeholder="Password"
              class="uk-input uk-form-large"
              v-model="password" required
            />
          </div>
        </div>
        <div class="uk-margin">
          <button class="uk-button uk-button-default uk-width-1-1" type="submit" @click="handleSubmit">
            Login
          </button>
        </div>
      </fieldset>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if (this.password.length > 0) {
        this.$http
          .post("http://localhost:1337/auth/local", {
            identifier: this.email,
            password: this.password
          })
          .then(response => {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("apollo-token", response.data.jwt);
            //onLogin

            if (localStorage.getItem("jwt") != null) {
              this.$emit("loggedIn");
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
              } else {
                this.$router.push("dash");
              }
            }
          })
          .catch(function(error) {
            console.log(error.response);
          });
      }
    }
  }
};
</script>
