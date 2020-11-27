import Layout from "@/views/layout/the-layout.vue";

const authRouter = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/home",
        alias: "/",
        component: () => import("@/views/components/home/index.vue"),
        name: "Home",
        meta: {
          title: "route.home",
          icon: "mdi-home",
          noCache: true,
          affix: true
        }
      }
    ]
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/history",
        component: () => import("@/views/components/history/index.vue"),
        name: "History",
        meta: {
          title: "route.history",
          icon: "mdi-near-me",
          noCache: true,
          affix: true
        }
      }
    ]
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/products",
        component: () => import("@/views/components/products/index.vue"),
        name: "Products",
        meta: {
          title: "route.products",
          icon: "mdi-timeline-text",
          noCache: true,
          affix: true
        }
      }
    ]
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/follow-up",
        component: () => import("@/views/components/follow-up.vue"),
        name: "FollowUp",
        meta: { title: "route.followUp", icon: "mdi-palette" }
      }
    ]
  },
  // {
  //   path: "/",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "/chat",
  //       component: () => import("@/views/components/chat.vue"),
  //       name: "Chat",
  //       meta: { title: "route.followUp", icon: "mdi-palette" }
  //     }
  //   ]
  // },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/referal",
        component: () => import("@/views/components/Referal.vue"),
        name: "Referal",
        meta: {
          title: "route.referal",
          icon: "mdi-text-subject",
          noCache: true,
          affix: true
        }
      }
    ]
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/industry",
        component: () => import("@/views/components/industry/index.vue"),
        name: "Industry",
        meta: {
          title: "route.industry",
          icon: "mdi-text-subject",
          noCache: true,
          affix: true
        }
      }
    ]
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/industry/list",
        component: () => import("@/views/components/industry/list.vue"),
        name: "Industry",
        meta: {
          title: "route.industry.list",
          icon: "mdi-text-subject",
          noCache: true,
          affix: true
        }
      }
    ]
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/supplier",
        component: () => import("@/views/components/supplier/index.vue"),
        name: "Supplier",
        meta: {
          title: "route.supplier",
          icon: "mdi-text-subject",
          noCache: true,
          affix: true
        }
      }
    ]
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/profile",
        component: () => import("@/views/components/profile.vue"),
        name: "Profile",
        meta: { title: "route.profile", icon: "mdi-translate" }
      }
    ]
  },
  // {
  //   path: "/",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "/products",
  //       component: () => import("@/views/components/products/index.vue"),
  //       name: "Products",
  //       meta: { title: "route.products", icon: "mdi-translate" }
  //     }
  //   ]
  // },
  // {
  //   path: "/",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "/profile",
  //       component: () => import("@/views/components/profile/index.vue"),
  //       name: "Profile",
  //       meta: { title: "route.profile", icon: "mdi-account" }
  //     }
  //   ]
  // },
  // {
  //   path: "/",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "/about-us",
  //       component: () => import("@/views/components/about-us.vue"),
  //       name: "About",
  //       meta: { title: "route.about", icon: "mdi-translate" }
  //     }
  //   ]
  // },
  // {
  //   path: "/",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "/contact-us",
  //       component: () => import("@/views/components/contact-us.vue"),
  //       name: "Contact",
  //       meta: { title: "route.contact", icon: "mdi-translate" }
  //     }
  //   ]
  // },
  // {
  //   path: "/",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "/how-to",
  //       component: () => import("@/views/components/how-to.vue"),
  //       name: "HowtoUse",
  //       meta: {
  //         title: "route.HowtoUse",
  //         icon: "mdi-translate"
  //       }
  //     }
  //   ]
  // },
  //   {
  //   path: "/",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "/latest-news",
  //       component: () => import("@/views/components/latest-news.vue"),
  //       name: "LatestNews",
  //       meta: {
  //         title: "route.latestNews",
  //         icon: "mdi-translate"
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: "/",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "/product4",
  //       component: () => import("@/views/components/product4/index.vue"),
  //       title: "Test4",
  //       meta: {
  //         title: "Test4",
  //         icon: "mdi-timeline-text",
  //         noCache: true,
  //         affix: true
  //       }
  //     }
  //   ]
  // }
];

export default authRouter;
