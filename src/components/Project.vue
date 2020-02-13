<template>
  <div class="uk-container">
    <section>
      <h2>{{project.title}}</h2>
      <img v-bind:src="imageUrl(project)" alt="">
      <div>
        {{project.body}}
      </div>
    </section>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data: function () {
    return {
      project: []
    }
  },
  methods: {
      imageUrl: function (project) {
        return project.cover && project.cover.url
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
    project: {
      query: gql`query ($projectId: ID!) {
        project(id: $projectId) {
          id
          title
          body
          cover {
            url
          }
          members {
            id
            name
          }
        }
      }`,
      variables () {
        return {
          projectId: this.$route.params.project_id
        }
      }
    }
  }
}
</script>
