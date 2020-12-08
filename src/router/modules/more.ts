/** When your routing table is too long, you can split it into small modules */

import Layout from "@/views/layout/the-layout.vue";

const moreRouter = {
  path: "/",
  component: Layout,
  meta: {
    title: "route.more",
    icon: "mdi-more",
    noCache: true,
    affix: true
  },
  children: [
    {
      path: "/privacy",
      component: () => import("@/views/components/more/privacy.vue"),
      name: "Privacy",
      meta: {
        title: "route.moreComponents.privacy",
        icon: "mdi-text-subject",
        noCache: true,
        affix: true
      }
    },
    {
      path: "/terms",
      component: () => import("@/views/components/more/terms.vue"),
      name: "Terms",
      meta: {
        title: "route.moreComponents.terms",
        icon: "mdi-text-subject",
        noCache: true,
        affix: true
      }
    },
    {
      path: "/setting",
      component: () => import("@/views/components/more/setting.vue"),
      name: "Setting",
      meta: {
        title: "route.moreComponents.setting",
        icon: "mdi-text-subject",
        noCache: true,
        affix: true
      }
    }
  ]
};

export default moreRouter;
