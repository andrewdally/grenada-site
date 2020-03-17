<template>
  <div id="share-modal" class="uk-modal-full" uk-modal>
    <div class="uk-modal-dialog">
      <button class="uk-modal-close-full uk-close-large" type="button" uk-close></button>
      <div class="uk-section">
        <div class="uk-container">
          <h3>{{folder.title}}</h3>
          <h5>{{userList.length}} users have access</h5>
          <ul class="uk-list">
            <li v-for="user in userList" :key="user.id" class="uk-flex">
              <input class="uk-input" :value="user.email" disabled>
              <a @click="revokeFolder(user.id)" class="uk-button uk-text-danger"><span uk-icon="icon: minus-circle" /></a>
            </li>
            <li v-if="errorMessage" class="uk-alert-danger" uk-alert>
              <a class="uk-alert-close" uk-close @click="removeError($event)"></a>
              {{errorMessage}}
            </li>
            <li class="uk-flex">
              <input v-model="email" class="uk-input">
              <a @click="shareFolder()" class="uk-button uk-text-success"><span uk-icon="icon: plus-circle" /></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      email: '',
      errorMessage: null,
      userList: this.folder.users.map ( function(user) {
        return {
          email: user.email,
          id: user.id
        }
      })
    }
  },
  props: ['folder'],
  methods: {
    shareFolder() {
      axios.put(this.sharePath(true), {
        email : this.email
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('apollo-token')
        }
      })
      .then(response => {
        this.userList.push({
          email: response.data.email,
          id: response.data.id
        })
        this.email = ''
        this.errorMessage = null
      })
      .catch(error => {
        let message = (error.response.data && error.response.data.message)
        if (message) {
          this.errorMessage = message
        } else {
          this.errorMessage = 'Sorry something went wrong.'
        }
      })
    },
    revokeFolder (userId) {
      axios.put(this.sharePath(false), {
        id : userId
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('apollo-token')
        }
      })
      .then( response => {
        let user = response.data
        let index = this.userList.findIndex( (x) => x === user )
        this.userList.splice(index, 1)
      })
      .catch(error => {
        console.log('error', error)
      })
    },
    sharePath (share) {
      let path = share ? '/share' : '/revoke'
      return process.env.VUE_APP_STRAPI_CMS_HTTP + 'folders/' + this.folder.id + path
    },
    removeError (event) {
      event.stopPropagation()
      this.errorMessage = null
    },
  },
  watch: {
    folder: function() {
      this.userList = this.folder.users
    }
  }
}
</script>
<style scoped>
.uk-modal-full {
  z-index: 1050;
}
.uk-modal-full>.uk-modal-dialog {
  height: 100%;
}
</style>
