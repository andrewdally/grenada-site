<template>
  <div>
    <div uk-sticky id="hero" class="uk-height-viewport uk-background-cover uk-light uk-flex" v-bind:style="{ backgroundImage: `url(${background})`}">
      <div class="uk-container">
        <h1 uk-parallax="blur: 10;">Climate Smart Cities <span>Grenada</span></h1>
      </div>
    </div>
    <section class="uk-section-default uk-height-viewport uk-width-viewport uk-inline uk-padding-large">
      <p class="uk-position-center uk-text-lead uk-text-half" uk-parallax="opacity: 0,1; 1; viewport: 0.4; blur: 2,0">
        The Government of Grenada and the Marron Institute of Urban Management have partnered to support Grenada's efforts to become a role model in climate change adaptation and resilience.
      </p>
    </section>
    <section class="uk-section-default uk-width-viewport uk-inline uk-padding-large">
      <div class="uk-child-width-1-2" uk-grid="masonry: true;">
        <div>
          <div class="uk-grid-margin">
            <div class="uk-background-muted uk-padding uk-padding-large-top uk-padding-large-bottom">
              <h2>Projects</h2>
              <p class="uk-text-lead">
                Identifiying and protecting the most critical points is key to thriving in an increased area of risk.
              </p>
            </div>
          </div>
          <div v-for="(project, index) in asColumn(projects, 2, 2)" v-bind:key="project.id" class="uk-margin-large-top uk-margin-large-bottom project-card">
             <div v-bind:class="index === 0 ? 'first-project' : 'project'">
              <img uk-parallax="opacity:0.2,1; viewport: 0.4;" v-bind:src="coverImage(project)"/>
              <h3>{{project.title}}</h3>
              <p class="description">
                {{snippet(project)}}
                &nbsp;
                <a v-bind:href="'/projects/' + project.id">read more</a>
              </p>
            </div>
          </div>

        </div>
        <div>
          <div v-for="(project, index) in asColumn(projects, 1, 2)" v-bind:key="project.id" class="uk-margin-large-top uk-margin-large-bottom project-card">
             <div v-bind:class="index === 0 ? 'first-project' : 'project'">
              <img uk-parallax="opacity:0.2,1; viewport: 0.4;" v-bind:src="coverImage(project)"/>
              <h3>{{project.title}}</h3>
              <p class="description">
                {{snippet(project)}}
                &nbsp;
                <a v-bind:href="'/projects/' + project.id">read more</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="uk-section-default uk-height-viewport">
    </section>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import {filteredItems} from '@/utils'
export default {
  name: 'Home',
  data: function () {
    return {
      projects: [],
      posts: []
    }
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
  font-family: 'Univers', sans-serif;
  font-size:64px;
  font-size:9vw;
  font-weight: 300;
  margin: 120px auto;
  text-shadow: 0px 0px 10px rgba(0,0,0,0.75);
}
h1 span {
  text-transform: uppercase;
  font-weight: 700;
}
#hero {
  z-index: -1;
}
.uk-text-half {
  width: 50%;
}
.first-project {
  margin-top:120px;
}
</style>
