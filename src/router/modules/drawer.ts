import Layout from "@/views/layout/the-layout.vue";

const drawerRouter = [
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
          icon: "mdi-chart-line",
          noCache: true,
          affix: true
        }
      }
    ]
  }
];

export default drawerRouter;
