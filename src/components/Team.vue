<template>
  <div class="uk-container">
    <section>
      <h2>International Team</h2>
      <div class="uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid>
        <team-member
          v-for="member in internationalTeam"
          v-bind:key="member.id"
          v-bind:member="member"
        />
      </div>
    </section>
    <section>
      <h2>Grenada Team</h2>
      <div class="uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid>
        <team-member
          v-for="member in grenadaTeam"
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
  data: function () {
    return {
      members: []
    }
  },
  computed: {
    internationalTeam: function () {
      return this.members.filter(member => member.team === 'International');
    },
    grenadaTeam: function () {
      return this.members.filter(member => member.team === 'Grenada');
    }
  },
  apollo: {
    members: gql`query {
      members (sort: "id") {
        id
        name
        title
        description
        team
        photo {
          url
        }
      }
    }`
  },
  components: {
    TeamMember
  }
}
</script>
