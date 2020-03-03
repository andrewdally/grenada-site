<template>
  <div>
    <div v-for="item in sortedContents" v-bind:key="item.__typename + item.id">
      <a v-if="item.__typename === 'Document'"
        :href="item.file[0].url"
        target="_blank"
        :class="'uk-display-block ' + itemCardClass()">
        <document-card :document="item" @item-delete="itemDelete"/>
      </a>
      <div v-else @click="folderClick(item)" :class="itemCardClass()">
        <folder-card :folder="item" />
      </div>
    </div>
  </div>
</template>

<script>
import DocumentCard from './DocumentCard'
import FolderCard from './FolderCard'

export default {
  props: ['contents'],
  methods: {
    itemCardClass () {
      return 'uk-card uk-card-secondary uk-card-hover uk-padding-small uk-margin-small-bottom'
    },
    folderClick (item) {
      this.$emit('folder-click', item)
    },
    itemDelete (item) {
      this.$emit('item-delete', item)
    }
  },
  computed: {
    sortedContents () {
      let contents = [...this.contents]
      return contents.sort((a,b) => a.title.localeCompare(b.title))
    }
  },
  components: {
    DocumentCard,
    FolderCard
  }
}
</script>
