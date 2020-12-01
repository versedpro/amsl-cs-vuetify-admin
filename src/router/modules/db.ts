/** When your routing table is too long, you can split it into small modules */

import Layout from "@/views/layout/the-layout.vue";

const dbRouter = {
  path: "/",
  component: Layout,
  meta: {
    title: "route.database",
    icon: "mdi-database",
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
};

export default dbRouter;
