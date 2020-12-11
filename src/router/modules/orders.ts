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
      path: "/received",
      component: () => import("@/views/components/received/index.vue"),
      name: "Received",
      meta: { title: "route.ordersComponents.received", icon: "mdi-home", affix: true, roles: ["cs_admin", "sales_admin"] }
    },
    {
      path: "/ongoing",
      component: () => import("@/views/components/ongoing/index.vue"),
      name: "Ongoing",
      meta: { title: "route.ordersComponents.ongoing", icon: "mdi-home", affix: true, roles: ["cs_admin", "sales_admin"] }
    },
    {
      path: "completed",
      component: () => import("@/views/components/completed/index.vue"),
      name: "Completed",
      meta: { title: "route.ordersComponents.completed", icon: "mdi-home", affix: true, roles: ["cs_admin", "sales_admin"] }
    },
    {
      path: "Reject",
      component: () => import("@/views/components/rejected/index.vue"),
      name: "Reject",
      meta: { title: "route.ordersComponents.reject", icon: "mdi-home", affix: true, roles: ["cs_admin", "sales_admin"] }
    }
  ]
};

export default ordersRouter;
