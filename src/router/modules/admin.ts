/** When your routing table is too long, you can split it into small modules */

import Layout from "@/views/layout/the-layout.vue";

const adminRouter = {
  path: "/admin",
  component: Layout,
  redirect: "noredirect",
  name: "VuetifyDemo",
  meta: {
    title: "route.vuetify",
    icon: "mdi-home"
  },
  children: [
    {
      path: "/orders",
      component: () => import("@/views/components/orders/index.vue"),
      name: "Grid",
      meta: { title: "route.vuetifyComponents.grid", icon: "mdi-home", affix: true }
    },
    {
      path: "completed",
      component: () => import("@/views/components/completed/index.vue"),
      name: "Typography",
      meta: { title: "route.vuetifyComponents.typography", icon: "mdi-home", affix: true }
    }
  ]
};

export default adminRouter;
