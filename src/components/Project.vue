<template>
  <div class="uk-container">
    <section class="uk-section">
      <h2 class="uk-margin-large-bottom">{{project.title}}</h2>
      <div class="uk-margin-auto" style="max-width: 640px;">
        <img class="uk-margin-bottom" v-bind:src="imageUrl(project)" alt="">
        <vue-markdown :source="source"></vue-markdown>
        <a v-if="project.concept" class="uk-button uk-button-secondary" :href="project.concept.url" target="_blank">
          <span class="uk-margin-small-right" uk-icon="icon: download" />
          Download concept note
        </a>
      </div>
    </section>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import VueMarkdown from 'vue-markdown'
export default {
  data: function () {
    return {
      project: [],
      source: ''
    }
  },
  components: {
    VueMarkdown
  },
  methods: {
      imageUrl: function (project) {
        console.log('project', project)
        return project.cover && project.cover.url
      },
      proposalLink: function (project) {
        return project.proposal && project.proposal.url
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
          concept {
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
      },
      result(result) {
        this.project = result.data.project
        this.source = result.data.project.body
        console.log('project', this.project)
      }
    }
  }
}
</script>
