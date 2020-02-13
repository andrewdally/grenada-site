<template>
  <div>
    <div class="uk-card">
      <div class="uk-card-header">
        <div class="uk-grid-small uk-flex-middle" uk-grid>
          <div>
            <img class="uk-border-circle" width="120" height="120" v-bind:src="teamUrl">
          </div>
          <div class="uk-width-expand">
            <h3 class="uk-card-title uk-margin-remove-bottom">{{member.name}}</h3>
            <p class="uk-text-meta uk-margin-remove-top">{{member.title}}</p>
          </div>
        </div>
      </div>
      <div class="uk-card-body">
        <p>{{member.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamMember',
  props: ['member'],
  computed: {
    teamUrl: function () {
      return this.member.photo
       ? this.member.photo.url
       : require('@/assets/blank-profile.jpg')
    }
  }
}
</script>
<style scoped>
.uk-card {
  padding-bottom: 80px;
}
.uk-card-header {
  border-bottom: 1px solid #e5e5e5;
}
img.uk-border-circle {
  filter: grayscale(1);
  box-shadow: 1px 1px 10px rgba(255, 0, 0, 0.3);
}
</style>
