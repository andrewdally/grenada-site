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
          <twitter>
            <a
              class="twitter-timeline"
              data-tweet-limit="4"
              href="https://twitter.com/NYUMarron?ref_src=twsrc%5Etfw">Tweets by NYUMarron</a>
          </twitter>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ContactForm from "./ContactForm"
import { twitter } from 'vue-twitter'
export default {
  components: {
    ContactForm,
    twitter
  }
}
</script>
