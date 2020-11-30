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
        path: "/orders",
        component: () => import("@/views/components/orders/index.vue"),
        name: "Orders",
        meta: {
          title: "route.orders",
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
        path: "/completed",
        component: () => import("@/views/components/completed/index.vue"),
        name: "Completed",
        meta: {
          title: "route.completed",
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
    meta: {
      title: "route.table",
      icon: "mdi-text-subject",
      noCache: true,
      affix: true
    },
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
      },
      {
        path: "/products",
        component: () => import("@/views/components/products/index.vue"),
        name: "Products",
        meta: {
          title: "route.products",
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
          title: "route.supplier",
          icon: "mdi-text-subject",
          noCache: true,
          affix: true
        }
      }
    ]
  },
  // {
  //   path: "/",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "/profile",
  //       component: () => import("@/views/components/profile.vue"),
  //       name: "Profile",
  //       meta: { title: "route.profile", icon: "mdi-translate" }
  //     }
  //   ]
  // }
];

export default authRouter;
