import { RouteConfig } from "vue-router";

const routes: Array<RouteConfig> = [
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
    path: "/proposal/payment/:proposal_id",
    name: "proposal-payment",
    component: () => import("../views/proposal/PaymentView.vue"),
  },
];

export { routes as default };
