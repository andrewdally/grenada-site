<template>
  <div id="modal-example" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <form>
        <fieldset class="uk-fieldset">
          <div>{{parentFolder}}</div>
          <legend class="uk-legend">New Folder</legend>
          <div class="uk-margin">
            <input v-model="folderName" class="uk-input" type="text" placeholder="Folder name">
          </div>
          <p class="uk-text-right">
            <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
            <button class="uk-button uk-button-primary" type="button" @click="createFolder">Save</button>
          </p>
        </fieldset>
      </form>
    </div>
  </div>
</template>
<script>
import gql from 'graphql-tag'
export default {
  data () {
    return {
      folderName: ''
    }
  },
  props: ['parentFolder'],
  methods: {
    createFolder() {
      const newFolder = this.folderName
      const parentFolder = this.parentFolder


      this.$apollo.mutate({
        mutation: gql`mutation folderCreate ($title: String!, $parent_folder: ID!) {
          createFolder(input: {
            data: {
              title: $title,
              parent_folder: $parent_folder
            }
          }) {
            folder {
              title
              parent_folder {
                id
              }
            }
          }
        }`,
        variables: {
          title: newFolder,
          parent_folder: parentFolder
        }
      })
    }
  }
}
</script>
