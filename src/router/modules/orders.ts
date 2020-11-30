/** When your routing table is too long, you can split it into small modules */

import Layout from "@/views/layout/the-layout.vue";

const ordersRouter = {
  path: "/admin",
  component: Layout,
  redirect: "noredirect",
  name: "Admin",
  meta: {
    title: "route.orders",
    icon: "mdi-home"
  },
  children: [
    {
      path: "/orders",
      component: () => import("@/views/components/orders/index.vue"),
      name: "Grid",
      meta: { title: "route.ordersComponents.ongoing", icon: "mdi-home", affix: true }
    },
    {
      path: "completed",
      component: () => import("@/views/components/completed/index.vue"),
      name: "Typography",
      meta: { title: "route.ordersComponents.completed", icon: "mdi-home", affix: true }
    }
  ]
};

export default ordersRouter;
