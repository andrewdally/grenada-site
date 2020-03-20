<template>
  <div class="uk-margin-auto project-card" uk-scrollspy="cls:uk-animation-slide-bottom-small; repeat: true; offset: 250px;">
    <a
      class="uk-height-medium uk-background-cover uk-light uk-display-block project-link"
      v-bind:data-src="coverImage(project)"
      v-bind:href="'/projects/' + project.id"
      uk-img>
      <div class="overlay uk-flex uk-flex-middle">
        <h3>{{project.title}}</h3>
      </div>
    </a>
    <div v-if="$route.name == 'projects'" class="uk-margin-small-top">
      <a class="uk-button uk-button-secondary uk-button-small" :href="'/projects/' + project.id">
        Read more
      </a>
      <a v-if="project.concept" class="uk-button uk-button-secondary uk-button-small uk-margin-small-left" :href="project.concept.url" target="_blank">
        Concept Note
        <span uk-icon="icon: download; ratio: 0.75;"/>
      </a>
    </div>
    <div class="uk-margin-small-top" v-else>
      <p class="description uk-width-3-4@s uk-margin-auto@s uk-text-center@s">
        {{snippet(project)}}
      </p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: ['project'],
  methods: {
    coverImage (object) {
      console.log(object)
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
.overlay>h3 {
  font-size: 34px;
  font-size: 9vw;
  padding: 40px;
}
.uk-grid .overlay>h3 {
  font-size: 36px;
}
.pdf-link {
  margin-left: auto;
}
.uk-grid .description {
  padding: 10px;
}
@media screen and (min-width: 540px) {
  .overlay>h3 {
     font-size: 48px;
  }
}
.project-link {
  transition: filter .5s;
}
.overlay {
  transition: background-color .3s;
}
.project-link:hover {
  text-decoration: none;
}
.project-link h3 {
  transition: color .3s;
}
.project-link:hover h3 {
  color: #000;
}
.project-link:hover .overlay {
  background-color: rgba(255,255,255,.4);
}
</style>
