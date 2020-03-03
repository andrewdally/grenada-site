<template>
  <div class="uk-flex uk-flex-middle">
    <div class="uk-navbar-left">
      <span uk-icon="icon: folder; ratio:1;"></span>
      <span class="uk-margin-small-left">{{folder.title}}</span>
    </div>
    <div class="uk-navbar-right">
      <a @click="deleteFolder($event)" class="uk-icon-link trash-link" uk-icon="forward"></a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['folder'],
  methods: {
    deleteFolder (event) {
      event.stopPropagation()
    }
  }
}
</script>
