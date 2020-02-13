<template>
  <div id="app">
    <Nav />
    <div v-bind:class="bodyClass()">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
export default {
  name: 'app',
  components: {
    Nav,
    // Home
  },
  methods: {
    bodyClass() {
      return this.$route.name === 'Home'
        ? 'home-body'
        : 'page-body'
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'Univers';
  src: url('./assets/fonts/UniversLTPro-55Roman.otf');
  src: url('./assets/fonts/UniversLTPro-55Roman.ttf') format('truetype'),
       url('./assets/fonts/UniversLTPro-55Roman.woff') format('woff'),
       url('./assets/fonts/UniversLTPro-55Roman.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'Univers';
  src: url('./assets/fonts/UniversLTPro-65Bold.otf');
  src: url('./assets/fonts/UniversLTPro-65Bold.eot');
  src: url('./assets/fonts/UniversLTPro-65Bold.eot?#iefix') format('embedded-opentype'),
       url('./assets/fonts/UniversLTPro-65Bold.ttf') format('truetype'),
       url('./assets/fonts/UniversLTPro-65Bold.woff') format('woff'),
       url('./assets/fonts/UniversLTPro-65Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: 700;
}


#app {
  font-family: 'Univers', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
a {
  color: #358277;
}
.page-body{
  padding-top: 60px;
}
h2,h3,h4 {
  font-family: 'Univers', sans-serif;
}
h2 {
  font-family: 'Univers', Helvetica, sans-serif;
  font-weight: bold;
  font-size: 52px;
  line-height: 62px;
  text-align: center;
  border-bottom: 1px solid black;
  text-transform: uppercase;
}
.slender-container {
  max-width: 640px;
}
</style>
Celadon Green
#358277

Deep Green Cyan Turquoise
#337D73
