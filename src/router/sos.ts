import { RouteConfig } from "vue-router";

const routes: Array<RouteConfig> = [
  {
    path: "/sos/waiting",
    name: "waiting",
    component: () => import("@/views/sos/WaitingView.vue"),
  },
  {
    path: "/sos/testePage",
    name: "testePage",
    component: () => import("@/views/sos/ListCall.vue"),
  },
  {
    path: "/sos/form", //Meus Bilhete
    name: "form",
    component: () => import("@/views/sos/Form.vue"),
  },
  {
    path: "/sos/activecall", //Meus Bilhete
    name: "activeCall",
    component: () => import("@/views/sos/MechanicActiveCall.vue"),
  },
];

export { routes as default };
