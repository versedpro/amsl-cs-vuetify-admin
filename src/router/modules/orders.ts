/** When your routing table is too long, you can split it into small modules */

import Layout from "@/views/layout/the-layout.vue";

const ordersRouter = {
  path: "/orders",
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
      meta: {
        title: "route.ordersComponents.received",
        affix: true,
        roles: ["cs_admin", "sales_admin", "sales"]
      }
    },
    {
      path: "/following",
      component: () => import("@/views/components/following/index.vue"),
      name: "Following",
      meta: {
        title: "route.ordersComponents.following",
        affix: true,
        roles: ["cs_admin", "sales"]
      }
    },
    {
      path: "signed",
      component: () => import("@/views/components/signed/index.vue"),
      name: "Signed",
      meta: {
        title: "route.ordersComponents.signed",
        affix: true,
        roles: ["cs_admin", "sales"]
      }
    },
    {
      path: "completed",
      component: () => import("@/views/components/completed/index.vue"),
      name: "Completed",
      meta: {
        title: "route.ordersComponents.completed",
        icon: "mdi-home",
        affix: true,
        roles: ["cs_admin", "sales"]
      }
    },
    {
      path: "Reject",
      component: () => import("@/views/components/rejected/index.vue"),
      name: "Reject",
      meta: {
        title: "route.ordersComponents.reject",
        icon: "mdi-home",
        affix: true,
        roles: ["sales_admin", "sales"]
      }
    }
  ]
};

export default ordersRouter;
