<template>
  <transition name="fade">
    <div v-if="!deleted" class="uk-flex uk-flex-middle">
      <div class="uk-navbar-left">
        <span :uk-icon="documentIcon()"></span>
        <span class="uk-margin-small-left">{{document.title}}</span>
      </div>
      <div class="uk-navbar-right">
        <a @click="deleteDocument($event)" class="uk-icon-link action-link" uk-icon="trash"></a>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['document'],
  data () {
    return {
      deleted: false
    }
  },
  methods: {
    deleteDocument (event) {
      event.preventDefault()
      let result = confirm(`Are you sure you want to delete ${this.document.title}?`)
      if (result) {
        this.$http.
          delete(process.env.VUE_APP_STRAPI_CMS_HTTP + 'documents/' + this.document.id, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('apollo-token')
            }
          })
          .then( () => {
            this.$emit('item-delete', this.document)
          })
          .catch( () => {
            alert(`An error occurred deleting: ${this.document.title}`)
          })
      }
    },
    documentIcon () {
      switch(this.document.file[0].ext) {
        case '.jpg':
        case '.png':
        case '.PNG':
        case '.JPG':
          return 'icon: image; ratio: 1'
        case '.pdf':
          return 'icon: file-pdf; ratio: 1'
        default:
          return 'icon: file; ration: 1'
      }
    }
  }
}
</script>
