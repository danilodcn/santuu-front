import { RouteConfig } from "vue-router";

const routes: Array<RouteConfig> = [
  {
    path: "/renovation/certificates", //Meus Certificado
    name: "certificates",
    component: () => import("@/views/proposal_renovation/CertificateView.vue"),
  },
  {
    path: "/renovation/summary-certificate/:proposal_id/", //Resumo do Certificado
    name: "summary-certificate",
    component: () =>
      import("@/views/proposal_renovation/SummaryCertificate.vue"),
  },
  {
    path: "/renovation/proposal-values/:proposal_id/",
    name: "proposal-values",
    component: () =>
      import("@/views/proposal_renovation/ProposalValuesView.vue"),
  },
  {
    path: "/renovation/update-data/:proposal_id/",
    name: "update-data",
    component: () => import("@/views/proposal_renovation/UpdateDataView.vue"),
  },
];

export { routes as default };
