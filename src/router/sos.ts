import { RouteConfig } from "vue-router";

const routes: Array<RouteConfig> = [
  {
    path: "/sos/waiting",
    name: "waiting",
    component: () => import("@/views/sos/WaitingView.vue"),
  },
  {
    path: "/sos/chat",
    name: "chat",
    component: () => import("@/views/sos/ChatView.vue"),
  },
  {
    path: "/sos/list-call",
    name: "list-call",
    component: () => import("@/views/sos/ListCallView.vue"),
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
  {
    path: "/sos/review",
    name: "review",
    component: () => import("@/views/sos/ReviewView.vue"),
  },
  {
    path: "/sos/teste",
    name: "teste",
    component: () => import("@/views/sos/TesteView.vue"),
  },
];

export { routes as default };
