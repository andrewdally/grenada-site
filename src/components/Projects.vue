<template>
  <div class="uk-container">
    <section class="uk-section">
      <h2>Projects</h2>
      <div class="uk-grid uk-child-width-1-2@s">
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
export default {
  data: function () {
    return {
      projects: []
    }
  },
  components: {
    ProjectCard
  },
  apollo: {
    projects: gql`query {
      projects (sort: "sort_order") {
        id
        title
        body
        concept {
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
