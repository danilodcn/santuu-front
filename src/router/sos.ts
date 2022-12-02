import { RouteConfig } from "vue-router";

const routes: Array<RouteConfig> = [
  {
    path: "/sos/waiting",
    name: "waiting",
    component: () => import("@/views/sos/WaitingView.vue"),
  },
  {
    path: "/sos/list-call",
    name: "list-call",
    component: () => import("@/views/sos/ListCall.vue"),
  },
  {
    path: "/sos/form",
    name: "form",
    component: () => import("@/views/sos/Form.vue"),
  },
  {
    path: "/sos/active-call",
    name: "activeCall",
    component: () => import("@/views/sos/MechanicActiveCall.vue"),
  },
];

export { routes as default };
