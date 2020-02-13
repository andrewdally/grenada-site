<template>
  <div>
    <div uk-sticky id="hero" class="uk-height-viewport uk-background-cover uk-light" v-bind:style="{ backgroundImage: `url(${background})`}">
      <div class="overlay uk-flex uk-flex-middle">
        <h1 class="uk-text-center" uk-parallax="blur: 25;">Climate Smart Cities <span>Grenada</span></h1>
      </div>
    </div>
    <section class="uk-section-default uk-height-viewport uk-width-viewport uk-inline uk-padding-large"  uk-parallax="opacity: 0,1; viewport: 0.1;">
      <p class="uk-position-center uk-text-center uk-text-lead uk-text-half" uk-parallax="opacity: 0,1; viewport: 0.35; blur: 2,0">
        A small island in the middle of the ocean in a hurricane zone is inherently one of the most vulnerable places on earth. The Government of Grenada and the Marron Institute of Urban Management have partnered to support Grenada's efforts to become a role model in climate change adaptation and resilience.
      </p>
    </section>
    <section class="uk-section-default uk-width-viewport uk-inline uk-padding-large">
      <h2 uk-scrollspy="cls:uk-animation-slide-bottom-small; repeat: true; delay:250; offset: 250px;">Projects</h2>
      <div class="uk-margin-auto slender-container">
        <p class="uk-margin-auto uk-text-lead uk-text-center uk-margin-large-top" uk-scrollspy="cls:uk-animation-slide-bottom-small; repeat: true; delay:250; offset: 250px;">
          Identifiying and protecting the most critical points is key to thriving in an increased area of risk.
        </p>
        <project-card v-for="project in projects" v-bind:project="project" v-bind:key="project.id"/>
        <router-link to="projects" class="uk-button uk-button-default uk-width-1-1">
          See all projects
        </router-link>
      </div>
    </section>
    <section class="uk-section-default uk-height-viewport">
    </section>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import ProjectCard from '@/components/ProjectCard'
import {filteredItems} from '@/utils'
export default {
  name: 'Home',
  data: function () {
    return {
      projects: [],
      posts: []
    }
  },
  components: {
    ProjectCard
  },
  methods: {
    coverImage (object) {
      return object.cover && object.cover.url
    },
    asColumn (list, column, columns) {
      return filteredItems(list, column, columns)
    },
    snippet (object) {
      let snippet = object.body.substring(0, 200)
      let words = snippet.split(' ')
      words.pop()
      return words.join(' ') + '...'
    }
  },
  computed: {
    background () {
      return require('@/assets/grenada-banner.jpg')
    },
  },
  apollo: {
    projects: {
      query: gql`{
        projects(limit: 3) {
          id
          title
          body
          cover {
            url
          }
        }
        posts(limit: 3) {
          id
          title
          body
          cover {
            url
          }
        }
      }`,
      result(result) {
        this.projects = result.data.projects
        this.posts = result.data.posts
      }
    }
  }
}
</script>

<style scoped>
h1 {
  font-family: 'Suisse', sans-serif;
  font-size: 64px;
  font-size: 8vw;
  font-weight: 300;
  margin: 120px auto;
}
h1 span {
  text-transform: uppercase;
  font-weight: 700;
}
#hero {
  z-index: -1;
}
#hero .overlay {
  height: 100vh;
}
.uk-text-half {
  width: 50%;
}
.first-project {
  margin-top:120px;
}
</style>
