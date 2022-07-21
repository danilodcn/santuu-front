import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import RenewRoutes from "./renew";
import EventsRoutes from "./events";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/raffle",
    name: "raffle",
    component: () => import("@/views/RaffleView.vue"),
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
  ...RenewRoutes,
  ...EventsRoutes,
];

const router = new VueRouter({
  mode: "history",
  base: "/new",
  routes,
});

export default router;
