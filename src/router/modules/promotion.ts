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
      path: "news",
      component: () => import("@/views/components/promotion/index.vue"),
      name: "News",
      meta: { title: "route.news", icon: "mdi-home", affix: true }
    },
    {
      path: "ads",
      component: () => import("@/views/components/promotion/ads.vue"),
      name: "Ads",
      meta: { title: "route.homeAds", icon: "mdi-home", affix: true }
    },
    {
      path: "products",
      component: () => import("@/views/components/promotion/products.vue"),
      name: "Products",
      meta: { title: "route.hotProducts", icon: "mdi-home", affix: true }
    }
  ]
};

export default promotionRouter;
