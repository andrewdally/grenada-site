<template>
  <div>
    <ul class="uk-breadcrumb">
      <li v-if="folderTree.length === 0">
        <span>Home</span>
      </li>
      <li v-else>
        <a v-on:click="editTree(-1)">Home</a>
      </li>
      <template v-for="(folder, index) in folderTree">
        <li v-if="isLastFolder(folder)" v-bind:key="folder.id">
          <span>{{folder.title}}</span>
        </li>
        <li v-else v-bind:key="folder.id">
          <a v-on:click="editTree(index)">
            {{folder.title}}
          </a>
        </li>
      </template>
    </ul>
    <table class="uk-table uk-table-divider">
      <tr v-for="item in contents" v-bind:key="item.__typename + item.id">
        <td v-if="item.__typename === 'Document'">
          <span uk-icon="icon: file-pdf; ratio: 1"></span>
          <a v-bind:href="documentDownload(item)" target="_blank">
            {{documentName(item)}}
          </a>
        </td>
        <td v-else>
          <span uk-icon="icon: folder; ratio: 1"></span>
          <a v-on:click="itemClick(item)">
            {{item.title}}
          </a>
        </td>
      </tr>
    </table>
    <a href="#modal-example" uk-toggle>Open</a>
    <folder-form v-bind:parentFolder="currentFolder"/>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import FolderForm from './FolderForm'
export default {
  data () {
    return {
      folder: {},
      initialFolder: 1,
      folderTree: []
    }
  },
  computed: {
    contents: function () {
      return this.folder.folders
        && this.folder.documents
        ? this.folder.folders.concat(this.folder.documents)
        : [];
    },
    currentFolder: function () {
      return this.folderTree.length === 0
        ? this.initialFolder
        : this.folderTree.slice(-1)[0].id
    }
  },
  methods: {
    documentDownload (doc) {
      return 'http://localhost:1337' + doc.file[0].url;
    },
    documentName (doc) {
      return doc.title + '.' + doc.file[0].url.split('.')[1]
    },
    isLastFolder (folder) {
      return folder === this.folderTree.slice(-1)[0];
    },
    itemClick (item) {
      this.folderTree.push(item)
    },
    editTree (index) {
      this.folderTree = this.folderTree.slice(0, index + 1)
    }
  },
  components: {
    FolderForm
  },
  apollo: {
    folder: {
      query: gql`query FolderGet($folderId: ID!) {
        folder(id: $folderId) {
          id
          title
          parent_folder {
            id
            title
          }
          folders {
            id
            title
          }
          documents {
            id
            title
            file {
              url
            }
          }
        }
      }`,
      variables () {
        return {
          folderId: this.currentFolder
        }
      }
    }
  }
}
</script>
