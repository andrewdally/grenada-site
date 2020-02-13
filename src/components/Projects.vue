<template>
  <div class="uk-container">
    <section>
      <h2>Projects</h2>
      <div class="uk-child-width-1-3@m" uk-grid>
        <div v-for="project in projects" v-bind:key="project.id">
          <div class="uk-card uk-card-default">
            <div class="uk-card-media-top">
              <a v-bind:href="'/projects/' + project.id">
                <img v-bind:src="imageUrl(project)" alt="">
              </a>
            </div>
            <div class="uk-card-body">
              <h3 class="uk-card-title">{{project.title}}</h3>
              <p>{{firstSentences(project)}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data: function () {
    return {
      projects: []
    }
  },
  methods: {
      imageUrl: function (project) {
        return project.cover &&  project.cover.url
      },
      proposalLink: function (project) {
        return project.proposal ? 'http://localhost:1337' + project.proposal.url : ''
      },
      // Refactor into util function. See Home.vue
      firstSentences: function (project) {
        let sentences = project.body.split('. ')
        let firstTwo = sentences.slice(0, 2)
        return firstTwo.join('. ')
      }
  },
  apollo: {
    projects: gql`query {
      projects {
        id
        title
        body
        proposal {
          url
        }
        cover {
          url
        }
        members {
          id
          name
        }
      }
    }`
  }
}
</script>
