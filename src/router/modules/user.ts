/** When your routing table is too long, you can split it into small modules */

import Layout from "@/views/layout/the-layout.vue";

const userRouter = {
  path: "/",
  component: Layout,
  meta: {
    title: "route.user",
    icon: "mdi-account-multiple",
    noCache: true,
    affix: true
  },
  children: [
    {
      path: "/registration",
      component: () => import("@/views/components/registration/index.vue"),
      name: "Registration",
      meta: {
        title: "route.userComponents.registration",
        icon: "mdi-text-subject",
        noCache: true,
        affix: true,
        roles: ["cs_admin", "cs"]
      }
    },
    {
      path: "/referlo",
      component: () => import("@/views/components/referlo/index.vue"),
      name: "referlo",
      meta: {
        title: "route.userComponents.referlo",
        icon: "mdi-text-subject",
        noCache: true,
        affix: true,
        roles: ["cs_admin"]
      }
    },
    {
      path: "/user",
      component: () => import("@/views/components/user/index.vue"),
      name: "user",
      meta: {
        title: "route.userComponents.backend",
        icon: "mdi-text-subject",
        noCache: true,
        affix: true,
        roles: ["cs_admin", "cs"]
      }
    }
  ]
};

export default userRouter;
