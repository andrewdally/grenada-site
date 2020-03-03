<template>
  <div class="uk-container uk-height-viewport">
    <div class="uk-section">
      <h2>Connect</h2>
      <div uk-grid>
        <div class="uk-width-2-3@s">
          <p class="lead">Get in touch.</p>
          <contact-form />
        </div>
        <div class="uk-width-1-3@s">
          Follow us on twitter.
          <tweets />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ContactForm from "./ContactForm"
import Tweets from "./Tweets"
export default {
  components: {
    ContactForm,
    Tweets
  }
}
</script>
