<template>
  <div id="upload-modal" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <form>
        <fieldset class="uk-fieldset">
          <div class="uk-margin">
            <legend class="uk-legend">New Document</legend>
          </div>
          <div class="uk-margin">
            <div uk-form-custom>
              <input @change="onFileChange" type="file">
              <button class="uk-button uk-button-default" type="button" tabindex="-1">Select File</button>
            </div>
          </div>
          <div v-if="file" uk-alert>
            <a @click="removeFile" class="uk-alert-close uk-text-small" uk-close></a>
            <p class="uk-text-small uk-margin-small-left uk-margin-small-bottom uk-margin-large-top">
              {{file.name}}
            </p>
            <progress class="uk-progress uk-margin-remove" :value="uploadPercentage" max=""></progress>
          </div>
          <p class="uk-text-right">
            <button class="uk-button uk-button-default uk-modal-close" @click="removeFile" type="button">Cancel</button>
            <button class="uk-button uk-button-primary uk-margin-small-left" type="button" @click="uploadFile">Start Upload</button>
          </p>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import gql from 'graphql-tag'
export default {
  data () {
    return {
      folderName: '',
      file: null,
      form: '',
      uploadPercentage: 0
    }
  },
  props: ['parentFolder'],
  methods: {
    onFileChange (event) {
      this.file = event.target.files[0]
      console.log('file', this.file)
    },
    attachDocument (fileResponse) {
      const docTitle = fileResponse.name
      const docFile = fileResponse.id
      const docFolder = this.parentFolder

      this.$apollo.mutate({
        mutation: gql`mutation documentCreate ($title: String!, $folder: ID!, $file: [ID!]) {
          createDocument(input: {
            data: {
              title: $title,
              folder: $folder,
              file: $file
            }
          }) {
            document {
              title
              file {
                id
              }
              folder {
                id
              }
            }
          }
        }`,
        variables: {
          title: docTitle,
          file: docFile,
          folder: docFolder
        }
      }).then( (result) => {
        console.log(result)
        this.$emit('add-document', result.data.createDocument.document)
        this.removeFile()
      }).catch( (error) => {
        console.log(error)
      })
    },
    removeFile () {
      this.file = null
      this.uploadPercentage = 0
    },
    uploadFile () {
      let bodyFormData = new FormData()
      const attachDocument = this.attachDocument
      bodyFormData.append('files', this.file)
      axios.post(
        process.env.VUE_APP_STRAPI_CMS_HTTP + 'upload',
        bodyFormData,
        {
          onUploadProgress: function( progressEvent ) {
            this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ) )
          }.bind(this)
        }
      )
      .then(function (response) {

        attachDocument(response.data[0])
      })
      .catch(function (response) {
        console.log(response)
      })
    }
  }
}

</script>

<style>
.uk-progress {
  border: 1px solid #666;
}
</style>
