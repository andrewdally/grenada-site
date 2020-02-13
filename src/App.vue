<template>
  <div id="app">
    <Nav />
    <div v-bind:class="bodyClass()">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
export default {
  name: 'app',
  components: {
    Nav,
    Footer
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
  font-family: 'Suisse';
  src: url('./assets/fonts/SuisseIntl-Regular.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'Suisse';
  src: url('./assets/fonts/SuisseIntl-SemiBold.woff2') format('woff2'); 
  font-weight: 700;
  font-style: 700;
}


#app {
  font-family: 'Suisse', Helvetica, Arial, sans-serif;
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
  font-family: 'Suisse', sans-serif;
}
h2 {
  font-family: 'Suisse', Helvetica, sans-serif;
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
.overlay {
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.25);
}
</style>
Celadon Green
#358277

Deep Green Cyan Turquoise
#337D73
