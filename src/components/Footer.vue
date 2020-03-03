<template>
  <div id="footer" class="uk-section-small">
    <div class="uk-container uk-flex uk-child-width-1-3@s">
      <div>
        <span class="copyright">©2020 CGSGRENADA</span>
      </div>
      <div>
        <ul class="uk-nav uk-light">
          <li>
            <router-link to="about">About</router-link>
          </li>
          <li>
            <router-link to="projects">Projects</router-link>
          </li>
          <li>
            <router-link to="team">Team</router-link>
          </li>
        </ul>
      </div>
      <div>
        <ul class="uk-nav uk-light">
          <li>
            <router-link to="dash">Knowledge Area</router-link>
          </li>
          <li>
            <router-link to="connect">Connect</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
  #footer {
    background: black;
    font-size: 13px;
  }
  .copyright {
    color: white;
    font-size: 14px;
    font-weight: 700;
  }
</style>
