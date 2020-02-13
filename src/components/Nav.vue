<template>
  <div>
  <div class="uk-fixed-nav" v-bind:style="navStyle" v-bind:uk-parallax="navParallax">
    <nav class="uk-navbar uk-container" uk-navbar>
      <div class="uk-navbar-left">
        <router-link to="/" class="uk-navbar-item uk-logo">
          CSC<span>GRENADA</span>
        </router-link>
      </div>
      <div class="uk-navbar-right">
        <ul class="uk-navbar-nav uk-visible@m">
          <li v-bind:class="isActive('about')">
            <router-link to="/about">About</router-link>
          </li>
          <li v-bind:class="isActive('team')">
            <router-link to="/team">Team</router-link>
          </li>
          <li v-bind:class="isActive('projects')">
            <router-link to="/projects">Projects</router-link>
          </li>
        </ul>
        <div class="uk-navbar-item uk-visible@m">
          <router-link to="/dash" class="uk-button uk-button-default members-button">Members</router-link>
        </div>
        <a class="uk-navbar-toggle uk-hidden@m" uk-navbar-toggle-icon href="#offcanvas" uk-toggle></a>
      </div>
    </nav>
  </div>
  <div id="offcanvas" uk-offcanvas="mode: push; overlay: true">
    <div class="uk-offcanvas-bar">
        <div class="uk-panel">
            <ul class="uk-nav uk-nav-default tm-nav">
              <li v-bind:class="isActive('about')">
                <router-link to="/about">About</router-link>
              </li>
              <li v-bind:class="isActive('team')">
                <router-link to="/team">Team</router-link>
              </li>
              <li v-bind:class="isActive('projects')">
                <router-link to="/projects">Projects</router-link>
              </li>
              <li v-bind:class="isActive('dash')">
                <router-link to="/dash">Dash</router-link>
              </li>
            </ul>
        </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Nav',
  data: function() {
    return {
      navStyle: '',
      navParallax: ''
    }
  },
  methods: {
    isActive (routeName) {
      if (routeName === this.$route.name) {
        return 'uk-active'
      } else {
        return ''
      }
    },
    setNav(routeName) {
      if (routeName === 'Home') {
        this.navStyle = "background-color: rgba(0,0,0,0)"
        this.navParallax = "background-color: rgba(0,0,0,1); viewport: .9;"
      } else {
        this.navStyle = "background-color: rgba(0,0,0,1)"
        this.navParallax = null
      }
    },
  },
  watch: {
    '$route.name' : {
      handler(name) {
        this.setNav(name)
      }
    }
  },
  mounted: function () {
    this.setNav(this.$route.name)
  }
}
</script>

<style>
  div.uk-navbar-item {
    padding-right: 0;
  }
  .uk-navbar-nav>li>a {
    letter-spacing: 1.5px;
    border-bottom: 0px solid white;
    padding-bottom: 5px;
    transition: border-width .3s, padding-bottom .3s;
  }
  .uk-navbar-nav>li>a, .uk-logo, .uk-navbar-toggle {
    color: white !important;
    text-shadow: 0px 0px 10px rgba(0,0,0,0.75);
  }
  .uk-navbar-nav>li>a:hover {
    color: white;
    border-width: 5px;
    padding-bottom: 0;
  }
  .uk-navbar-nav>li.uk-active>a{
    color: #666 !important;
    border-color: #666;
    border-width: 5px;
    padding-bottom: 0;
  }
  .uk-logo {
    font-size: 28px;
  }
  .members-button {
    letter-spacing: 1.5px;
    border-radius: 75px;
    color: white;
    border-color: white;
    transition: border-radius .5s, border .5s, margin .5s;
    background-color: rgba(0,0,0,0.05);
    margin: 0 4px;
  }
  .members-button:hover {
    color: white;
    border-color: white;
    border-radius: 0px;
    background-color: rgba(0,0,0,0.05);
    border: 5px solid white;
    margin: 0;
  }
  .uk-logo {
    font-family: 'Univers', sans-serif;
    font-weight: 300;
    color: white;
  }
  .uk-logo span{
    font-weight: 700;
  }
  .uk-fixed-nav {
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    z-index: 1030;
    height: 60px;
  }
  .uk-home-nav {
    background: rgba(0,0,0,0);
  }
  .uk-home-nav,
  .uk-navbar-item, .uk-navbar-nav>li>a, .uk-navbar-toggle {
    min-height: 60px;
  }
  #offcanvas {
    z-index: 1040;
  }
  #offcanvas .uk-nav-default>li>a {
    color:white;
    font-family: 'Univers';
    font-size: 22px;
    text-transform: uppercase;
  }
</style>
