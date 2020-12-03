/** When your routing table is too long, you can split it into small modules */

import Layout from "@/views/layout/the-layout.vue";

const ordersRouter = {
  path: "/admin",
  component: Layout,
  redirect: "noredirect",
  name: "Admin",
  meta: {
    title: "route.orders",
    icon: "mdi-cart"
  },
  children: [
    {
      path: "/orders",
      component: () => import("@/views/components/orders/index.vue"),
      name: "Ongoing",
      meta: { title: "route.ordersComponents.ongoing", icon: "mdi-home", affix: true }
    },
    {
      path: "completed",
      component: () => import("@/views/components/completed/index.vue"),
      name: "Completed",
      meta: { title: "route.ordersComponents.completed", icon: "mdi-home", affix: true }
    },
    {
      path: "Reject",
      component: () => import("@/views/components/rejected/index.vue"),
      name: "Reject",
      meta: { title: "route.ordersComponents.reject", icon: "mdi-home", affix: true }
    }
  ]
};

export default ordersRouter;
