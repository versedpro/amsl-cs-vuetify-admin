/** When your routing table is too long, you can split it into small modules */

import Layout from "@/views/layout/the-layout.vue";

const promotionRouter = {
  path: "/promotion",
  component: Layout,
  redirect: "noredirect",
  name: "Promotion",
  meta: {
    title: "route.promotion",
    icon: "mdi-tag"
  },
  children: [
    {
      path: "/orders",
      component: () => import("@/views/components/orders/index.vue"),
      name: "Ongoing",
      meta: { title: "route.news", icon: "mdi-home", affix: true }
    },
    {
      path: "completed",
      component: () => import("@/views/components/orders/index.vue"),
      name: "Completed",
      meta: { title: "route.homeAds", icon: "mdi-home", affix: true }
    },
    {
      path: "completed",
      component: () => import("@/views/components/orders/index.vue"),
      name: "Completed",
      meta: { title: "route.hotProducts", icon: "mdi-home", affix: true }
    }
  ]
};

export default promotionRouter;
