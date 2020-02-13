import Vue from "vue"
import Router from "vue-router"
import Home from "@/components/Home"
import About from "@/components/About"
import Team from "@/components/Team"
import Login from "@/components/Login"
import Dash from "@/components/Dash"
import Projects from "@/components/Projects"
import Project from "@/components/Project"

Vue.use(Router)

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/team",
      name: "team",
      component: Team
    },
    {
      path: "/projects",
      name: "projects",
      component: Projects
    },
    {
      path: "/projects/:project_id",
      name: "project",
      component: Project
    },{
      path: "/dash*",
      name: "dash",
      component: Dash,
      meta: {
        requires_auth: true
      }
    }
  ],
    scrollBehavior() {
        return {x: 0, y: 0}
    }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requires_auth)) {
    if (localStorage.getItem("apollo-token") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem("apollo-token") == null) {
      next();
    } else {
      next({ name: "dash" });
    }
  } else {
    next();
  }
});

export default router;
