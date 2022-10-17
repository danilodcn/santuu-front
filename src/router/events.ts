import { RouteConfig } from "vue-router";

const routes: Array<RouteConfig> = [
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
];

export { routes as default };
