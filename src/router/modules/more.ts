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
        affix: true,
        roles: ["cs_admin"]
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
        affix: true,
        roles: ["cs_admin"]
      }
    },
    {
      path: "/settings",
      component: () => import("@/views/components/more/settings.vue"),
      name: "SettingS",
      meta: {
        title: "route.moreComponents.settings",
        icon: "mdi-text-subject",
        noCache: true,
        affix: true
      }
    },
    {
      path: "/about",
      component: () => import("@/views/components/more/about.vue"),
      name: "About",
      meta: {
        title: "route.moreComponents.about",
        icon: "mdi-text-subject",
        noCache: true,
        affix: true
      }
    }
  ]
};

export default moreRouter;
