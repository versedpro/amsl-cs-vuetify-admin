/** When your routing table is too long, you can split it into small modules */

import Layout from "@/views/layout/the-layout.vue";

const moreRouter = {
  path: "/",
  component: Layout,
  meta: {
    title: "route.more",
    icon: "mdi-dots-horizontal",
    noCache: true,
    affix: true
  },
  children: [
    {
      path: "/industry",
      component: () => import("@/views/components/industry/index.vue"),
      name: "Industry",
      meta: {
        title: "route.privacy",
        icon: "mdi-text-subject",
        noCache: true,
        affix: true
      }
    },
    {
      path: "/industry",
      component: () => import("@/views/components/industry/index.vue"),
      name: "Industry",
      meta: {
        title: "route.terms",
        icon: "mdi-text-subject",
        noCache: true,
        affix: true
      }
    },
    {
      path: "/supplier",
      component: () => import("@/views/components/supplier/index.vue"),
      name: "Supplier",
      meta: {
        title: "route.setting",
        icon: "mdi-text-subject",
        noCache: true,
        affix: true
      }
    }
  ]
};

export default moreRouter;
