<template>
  <div class="uk-container">
    <section class="uk-section">
      <h2>Projects</h2>
      <div class="uk-margin-auto" style="max-width: 640px;">
        <project-card v-for="project in projects" v-bind:key="project.id" v-bind:project="project"/>
      </div>
    </section>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import ProjectCard from '@/components/ProjectCard'
export default {
  data: function () {
    return {
      projects: []
    }
  },
  components: {
    ProjectCard
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
