<template>
  <div>
    <div id="hero" class="uk-height-viewport uk-background-cover uk-light uk-flex" v-bind:style="{ backgroundImage: `url(${backgroundUrl})`}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hero',
  props: ['backgroundImage'],
  computed: {
    backgroundUrl () {
      return require('@/assets/'+this.backgroundImage)
    }
  }
}
</script>
