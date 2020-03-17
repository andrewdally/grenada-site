<template>
  <div>
    <div class="uk-container uk-flex uk-align-middle">
      <div class="uk-navbar-left">
        <ul class="uk-breadcrumb">
          <li v-if="folderTree.length === 0">
            <span>Home</span>
          </li>
          <li v-else>
            <a v-on:click="downTree(-1)">Home</a>
          </li>
          <li v-for="(folder, index) in folderTree" v-bind:key="folder.id">
            <span v-if="isLastFolder(folder)">{{folder.title}}</span>
            <a v-else @click="downTree(index)">{{folder.title}}</a>
          </li>
        </ul>
      </div>
      <div class="uk-navbar-right">
        <a @click="logout" class="uk-button uk-button-text uk-margin-medium-right">Logout</a>
      </div>
    </div>
    <div class="uk-container">
      <div>
        <folder-contents
          :contents="contents"
          @folder-click="climbTree"
          @item-delete="itemDelete"
          @folder-share="shareFolder"
        />
        <template v-if="adminOrPartner()">
          <p uk-margin>
            <a class="uk-button uk-button-default" href="#folder-modal" uk-toggle>Add folder</a>
            <a class="uk-button uk-button-default uk-margin-small-left" href="#upload-modal" uk-toggle>Add files</a>
          </p>
          <folder-form @add-folder="addItem" v-bind:parentFolder="currentFolder"/>
          <uploader-form @add-document="addItem" v-bind:parentFolder="currentFolder"/>
          <share-form v-if="sharingFolder"  @share-complete="shareComplete" v-bind:folder="sharingFolder" :key="sharingId"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import axios from 'axios'
import FolderContents from './FolderContents'
import FolderForm from './FolderForm'
import UploaderForm from './UploaderForm'
import ShareForm from './ShareForm'

export default {
  data () {
    return {
      folder: {},
      initialFolder: 1,
      folderTree: [],
      contents: [],
      sharingId: 0,
      sharingFolder: null
    }
  },
  computed: {
    currentFolder: function () {
      return this.folderTree.length === 0
        ? this.initialFolder
        : this.folderTree.slice(-1)[0].id
    }
  },
  mounted: function() {
    // this.fetchFolder()
  },
  watch: {
    currentFolder: function () {
      // this.fetchFolder()
    }
  },
  methods: {
    isLastFolder (folder) {
      return folder === this.folderTree.slice(-1)[0]
    },
    downTree (index) {
      this.folderTree = this.folderTree.slice(0, index + 1)
    },
    climbTree (clickedFolder) {
      this.folderTree.push(clickedFolder)
    },
    addItem (item) {
      this.contents.push(item)
    },
    itemDelete (item) {
      let index = this.contents.findIndex( (x) => x === item )
      this.contents.splice(index, 1)
    },
    shareFolder: async function (folder) {
      this.sharingFolder = folder
      await this.$nextTick()
      window.UIkit.modal('#share-modal').show()
    },
    shareComplete (folder) {
      console.log(folder)
    },
    logout () {
      localStorage.removeItem("apollo-token")
      localStorage.removeItem("user")
      this.$router.push("/")
    },
    adminOrPartner () {
      let user = JSON.parse(localStorage.getItem('user'))
      return user.role && (user.role.type === 'admin' || user.role.type === 'partner')
    },
    fetchFolder () {
      axios.get(process.env.VUE_APP_STRAPI_CMS_HTTP + 'folders/filtered/' + this.currentFolder ,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('apollo-token')
        }
      })
      .then( response => {
        console.log('response', response)
      })
    }
  },
  components: {
    FolderForm,
    UploaderForm,
    FolderContents,
    ShareForm
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
            users {
              id
              email
            }
          }
          documents {
            id
            title
            file {
              url
              ext
            }
          }
        }
      }`,
      variables () {
        return {
          folderId: this.currentFolder
        }
      },
      result (result) {
        let folder = result.data.folder
        this.folder = folder
        this.contents = folder.folders.concat(folder.documents)
      }
    }
  }
}
</script>
<style>
.uk-card-hover:hover {
  cursor: pointer;
  text-decoration: none;
}
.uk-card-hover:hover span, .uk-card-hover:hover .uk-icon {
  color: #fff !important;
}
.uk-card-hover:hover .action-link {
  color: rgba(255,255,255,.5) !important;
}
.uk-card-hover:hover .action-link:hover {
  color: #fff !important;
}
.uk-breadcrumb {
  margin: 0;
}
.uk-breadcrumb>*>* {
  display: flex;
  align-items: center;
  padding: 0 15px;
  min-height: 60px;
}
.uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before {
  display: block;
  float: left;
  margin: 18px 0;
}
</style>
