<template>
  <div class="uk-container">
    <section class="uk-section">
      <h2>Projects</h2>
      <div class="uk-grid uk-child-width-1-2@s uk-child-width-1-3@m">
        <project-card v-for="project in projects"
          class="project-collection"
          v-bind:key="project.id"
          v-bind:project="project"
        />
      </div>
    </section>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import ProjectCard from '@/components/ProjectCard'
import {filteredItems} from '@/utils'
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
      imageUrl (project) {
        return project.cover &&  project.cover.url
      },
      proposalLink (project) {
        return project.proposal ? 'http://localhost:1337' + project.proposal.url : ''
      },
      // Refactor into util function. See Home.vue
      firstSentences (project) {
        let sentences = project.body.split('. ')
        let firstTwo = sentences.slice(0, 2)
        return firstTwo.join('. ')
      },
      asColumn (list, column, columns) {
        return filteredItems(list, column, columns)
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
