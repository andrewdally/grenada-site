<template>
  <div>
    <ul class="uk-breadcrumb">
      <li v-if="folderTree.length === 0">
        <span>Home</span>
      </li>
      <li v-else>
        <router-link :to="{ name: 'dash', params: {} }">Home</router-link>
      </li>
      <template v-for="(folder, index) in folderTree">
        <li v-if="isLastFolder(folder)" v-bind:key="folder.id">
          <span>{{folder.title}}</span>
        </li>
        <li v-else v-bind:key="folder.id">
          <a v-on:click="$emit('crumb-click', index)">
            {{folder.title}}
          </a>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  props: ['folderTree'],
  methods: {
    isLastFolder (folder) {
      return folder === this.folderTree.slice(-1)[0];
    }
  }
}
</script>
