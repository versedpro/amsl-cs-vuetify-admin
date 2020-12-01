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
      path: "/privacy",
      component: () => import("@/views/components/more/privacy.vue"),
      name: "Privacy",
      meta: {
        title: "route.privacy",
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
        title: "route.terms",
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
        title: "route.setting",
        icon: "mdi-text-subject",
        noCache: true,
        affix: true
      }
    }
  ]
};

export default moreRouter;
