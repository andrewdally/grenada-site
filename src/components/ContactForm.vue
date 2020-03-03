<template>
  <form>
    <transition name="fade">
      <div v-if="error" class="uk-alert uk-alert-danger">
        <a @click="removeError" class="uk-alert-close" uk-close></a>
        <p>{{this.error}}</p>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="success">
        <div class="uk-card uk-card-secondary uk-card-body">
          <h3>Thanks for reaching out</h3>
          <p>We'll get back to you as soon as possible.</p>
        </div>
      </div>
      <fieldset v-else class="uk-fieldset">
        <div class="uk-margin">
          <input
            id="subject"
            type="text"
            placeholder="Subject"
            class="uk-input uk-form-large"
            v-model="subject" required autofocus
          />

        </div>
        <div class="uk-margin">
          <input
            id="email"
            type="email"
            placeholder="Your Email"
            class="uk-input uk-form-large"
            v-model="email" required autofocus
          />
        </div>
        <div class="uk-margin">
          <input
            id="name"
            type="text"
            placeholder="Your Name"
            class="uk-input uk-form-large"
            v-model="name" required autofocus
          />
        </div>
        <div class="uk-margin">
          <div>
            <textarea
              id="body"
              placeholder="Message"
              class="uk-textarea uk-form-large"
              v-model="body" required
            />
          </div>
        </div>
        <div class="uk-margin">
          <button class="uk-button uk-button-secondary uk-width-1-1" type="submit" @click="handleSubmit">
            Send Message
          </button>
        </div>
      </fieldset>
    </transition>
  </form>
</template>
<script>
export default {
  data () {
    return {
      subject: "",
      name: "",
      email: "",
      body: "",
      errors: {},
      error: null,
      success: null
    }
  },
  methods: {
    validate (fieldName) {
      if (this[fieldName] == "") {
        this.errors[fieldName] = 'This field is required'
      } else {
        delete this.errors[fieldName]
      }
    },
    formIsValid () {
      [this.subject, this.name, this.email, this.body].forEach( (field) => {
        if ( field === "" ) {
          this.error = "All fields are required."
        } else {
          this.error = null
        }
      })
      return !this.error
    },
    removeError () {
      this.error = null
    },
    errorClass (fieldName) {
      return this.errors[fieldName] ? '' : ''
    },
    handleSubmit (event) {
      event.preventDefault()
      if ( !this.formIsValid() ) {
        return false
      }
      this.success = true
      this.$http
        .post(process.env.VUE_APP_STRAPI_CMS_HTTP + 'messages', {
          subject: this.subject,
          name: this.name,
          email: this.email,
          body: this.body
        })
        .then( () => {
          this.success = true
        })
        .catch( () => {
          this.error = "We're sorry but something went wrong."
        })
    }
  }
}
</script>
