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
          title: "route.drawerComponents.home",
          icon: "mdi-chart-line",
          noCache: true,
          affix: true
        }
      }
    ]
  }
  // {
  //   path: "/",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "/user",
  //       alias: "/",
  //       component: () => import("@/views/components/user/index.vue"),
  //       name: "User",
  //       meta: {
  //         title: "route.drawerComponents.user",
  //         icon: "mdi-chart-line",
  //         noCache: true,
  //         affix: true
  //       }
  //     }
  //   ]
  // }
];

export default drawerRouter;
