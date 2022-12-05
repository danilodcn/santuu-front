import { RouteConfig } from "vue-router";

const routes: Array<RouteConfig> = [
  {
    path: "/profile/",
    name: "profile-view",
    component: () => import("@/views/profile/ProfileView.vue"),
  },
];

export { routes as default };
