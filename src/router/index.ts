import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import RenewRoutes from "./renew";
import EventsRoutes from "./events";
import ProposalRoutes from "./proposal";
import Sos from "./sos";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/raffle",
    name: "raffle",
    component: () => import("@/views/RaffleView.vue"),
  },

  ...ProposalRoutes,
  ...RenewRoutes,
  ...EventsRoutes,
  ...Sos,
];

const router = new VueRouter({
  mode: "history",
  base: "/new",
  routes,
});

export default router;
