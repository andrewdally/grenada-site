<template>
  <div class="uk-flex uk-flex-middle">
    <div class="uk-navbar-left">
      <span uk-icon="icon: folder; ratio:1;"></span>
      <span class="uk-margin-small-left">{{folder.title}}</span>
    </div>
    <div class="uk-navbar-right">
      <a @click="shareFolder($event)" class="uk-icon-link action-link" uk-icon="forward"></a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['folder'],
  methods: {
    shareFolder (event) {
      event.stopPropagation()
      this.$emit('folder-share', this.folder)
    }
  }
}
</script>
