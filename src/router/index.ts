import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/raffle",
    name: "raffle",
    component: () => import("@/views/RaffleView.vue"),
  },

  {
    path: "/renovation/certificates",
    name: "certificates",
    component: () => import("@/views/proposal_renovation/CertificateView.vue"),
  },
  {
    path: "/renovation/update-data/:proposal_id/",
    name: "update-data",
    component: () => import("@/views/proposal_renovation/UpdateDataView.vue"),
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
  //
  {
    path: "/bike-events/", //Página Inicial
    name: "event-index",
    component: () => import("@/views/bike_events/IndexView.vue"),
  },
  {
    path: "/bike-events/events", //Eventos Disponível/Meu Eventos/Finalizados
    name: "events",
    component: () => import("../views/bike_events/EventListView.vue"),
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
    path: "/bike-events/event",
    name: "event",
    component: () => import("../views/bike_events/EventView.vue"),
  },
  // RENOVAÇÃO
  {
    path: "/renovation/renewal-summary/:proposal_id/", //Resumo da renovação
    name: "renewal-summary",
    component: () =>
      import("../views/proposal_renovation/RenovationBidsView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/new",
  routes,
});

export default router;
