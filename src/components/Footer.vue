<template>
  <div id="footer" class="uk-section-small">
    <div class="uk-container uk-flex uk-child-width-1-3@s">
      <div>
        <div class="copyright">©2020 CGSGRENADA</div>
        <div class="uk-margin-small-top" style="position:relative;">
          <img
            style="height: 50px; width: 50px; top: 0; left: 0;"
            :src="require('@/assets/gcf-logo-globe.png')" />
          <img
            style="position: absolute; height:34px; top: 30px; left: 53px;"
            :src="require('@/assets/gcf-logo-type-wh.png')" />
        </div>
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
