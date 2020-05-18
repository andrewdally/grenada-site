<template>
  <div class="uk-container">
    <section class="uk-section" v-for="team in teams" v-bind:key="team.id">
      <h2 class="uk-text-center uk-text-uppercase">{{team.title}}</h2>
      <div class="uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid>
        <team-member
          v-for="member in sortedMembers(team.members)"
          v-bind:key="member.id"
          v-bind:member="member"
        />
      </div>
    </section>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import TeamMember from './TeamMember'

export default {
  methods: {
    sortedMembers(members) {
      return members.slice().sort(this.memberNameCompare)
    },
    memberNameCompare(a, b) {
      let splitA = a.name.split(" ")
      let splitB = b.name.split(" ")
      let lastA = splitA[splitA.length - 1]
      let lastB = splitB[splitB.length - 1]

      if (lastA < lastB) return -1;
      if (lastA > lastB) return 1;
      return 0;
    }
  },
  apollo: {
    teams: gql`query {
      teams (sort: "sort_order") {
        id
        title
        members {
          id
          name
          title
          description
          photo {
            url
          }
        }
      }
    }`
  },
  components: {
    TeamMember
  }
}
</script>
<style scoped>
h2 {
  font-size: 48px;
  border-bottom: 1px solid black;
  margin-bottom: 80px;
}
</style>
