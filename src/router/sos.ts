import { RouteConfig } from "vue-router";

const routes: Array<RouteConfig> = [
  {
    path: "/sos/waiting",
    name: "waiting",
    component: () => import("@/views/sos/WaitingView.vue"),
  },
  {
    path: "/sos/testePage", //Meus Bilhete
    name: "testePage",
    component: () => import("@/views/sos/ListCall.vue"),
  },
];

export { routes as default };
