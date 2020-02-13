<template>
  <div class="uk-margin-auto project-card" uk-scrollspy="cls:uk-animation-slide-bottom-small; repeat: true; offset: 250px;">
    <div class="uk-height-medium uk-background-cover uk-light" v-bind:data-src="coverImage(project)" uk-img>
      <div class="overlay uk-flex uk-flex-middle">
        <h3>{{project.title}}</h3>
      </div>
    </div>
    <p class="description uk-text-center">
      {{snippet(project)}}
      &nbsp;
      <a v-bind:href="'/projects/' + project.id">read more</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: ['project'],
  methods: {
    coverImage (object) {
      return object.cover && object.cover.url
    },
    snippet (object) {
      let snippet = object.body.substring(0, 200)
      let words = snippet.split(' ')
      words.pop()
      return words.join(' ') + '...'
    }
  },
}
</script>

<style scoped>
.project-card {
  margin: 100px auto;
}
h2 {
  font-size: 52px;
  font-weight: 700;
  letter-spacing: 0.3px;
  margin-bottom: 0;
}
.overlay {
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.overlay>h3 {
  font-size: 34px;
  font-size: 9vw;
  padding: 40px;
}
.description {
  padding: 15px 90px;
}
@media screen and (min-width: 540px) {
  .overlay>h3 {
     font-size: 48px;
  }
}
</style>
