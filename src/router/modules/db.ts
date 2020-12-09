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
        title: "route.databaseComponents.industry",
        noCache: true,
        affix: true
      }
    },
    {
      path: "/products",
      component: () => import("@/views/components/products/index.vue"),
      name: "Products",
      meta: {
        title: "route.databaseComponents.products",
        noCache: true,
        affix: true
      }
    },
    {
      path: "/supplier",
      component: () => import("@/views/components/supplier/index.vue"),
      name: "Supplier",
      meta: {
        title: "route.databaseComponents.supplier",
        noCache: true,
        affix: true
      }
    },
    {
      path: "/supplierProducts",
      component: () => import("@/views/components/supplierProducts/index.vue"),
      name: "Supplier Products",
      meta: {
        title: "route.databaseComponents.supplierProducts",
        noCache: true,
        affix: true
      }
    }
  ]
};

export default dbRouter;
