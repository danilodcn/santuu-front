import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/simulation/proposal-values/:proposal_id/",
    name: "proposal-values",
    component: () => import("../views/simulation/ProposalValues.vue"),
  },
  {
    path: "/simulation/bike-info",
    name: "bike-info",
    component: () => import("../views/simulation/BikeInfo.vue"),
  },
  {
    path: "/bike-events/index", //Página Inicial
    name: "event-index",
    component: () => import("../views/bike_events/indexView.vue"),
  },
  {
    path: "/bike-events/available", //Eventos Disponível
    name: "available",
    component: () => import("../views/bike_events/AvailableView.vue"),
  },
  {
    path: "/bike-events/scheduled",
    name: "scheduled",
    component: () => import("../views/bike_events/ScheduledView.vue"),
  },
  {
    path: "/bike-events/concluded", //Eventos Concluídos
    name: "concluded",
    component: () => import("../views/bike_events/ConcludedView.vue"),
  },
  {
    path: "/bike-events/checkin",
    name: "event-checkin",
    component: () => import("../views/bike_events/CheckinView.vue"),
  },
  {
    path: "/bike-events/quiz",
    name: "quiz",
    component: () => import("../views/bike_events/QuizView.vue"),
  },
  {
    path: "/bike-events/success",
    name: "event-success",
    component: () => import("../views/bike_events/SuccessView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/new",
  routes,
});

export default router;
