<template>
  <v-card class="mx-auto" max-width="960" height="100%" tile>
    <v-card-title class="primary justify-center display-1 text-h5 gold--text">
      {{ $t("home.title") }}
    </v-card-title>
    <v-container id="dashboard" fluid grid-list-lg>
      <v-layout wrap>
        <v-flex xs12 sm6 v-for="(stat, index) in stats.monthlyStats" v-bind:key="index">
          <v-card :class="stat.bgColor" dark class="pa-5" elevation="0">
            <v-card-title>
              {{ $t("home.itemTitle") }}
            </v-card-title>
            <v-container>
              <v-layout wrap>
                <v-flex>
                  <v-icon x-large>{{ stat.icon }}</v-icon>
                </v-flex>
                <v-flex xs10 class="pl-5">
                  <p class="ma-0 caption text-uppercase">{{ $t("home.total") }}</p>
                  <h2 class="display-3 font-weight-bold">
                    <small v-if="stat.currency" class="display-1">$</small>{{ stat.data }}
                  </h2>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-btn rounded block depressed color="white" outlined :class="stat.btnColor">
                {{ $t("home.moreInfo") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout class="" row wrap> </v-layout>
    </v-container>

    <v-footer app>
      <v-card-actions>
        <h1 class="mr-5 text-h4">1323</h1>
        <v-divider vertical></v-divider>
      </v-card-actions>
    </v-footer>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "Home",

  setup() {
    const selected = ref([]);
    const score = ref([17, 583, 723]);
    const category = ref(["努力中", "未成功個案", "已成功個案"]);
    const title = ref("REFER 佬");

    const menuItem = ref(["轉介客戶", "過往記錄", "資訊中心", "個人資料"]);

    // const img1 = ref(require("@/assets/img/customer-support.png"));

    const stats = ref({
      monthlyStats: [
        {
          bgColor: "grey primary--text",
          btnColor: "primary--text",
          icon: "fas fa-folder-plus primary--text",
          title: "新增",
          subtitle: "total",
          data: "120",
          action: {
            label: "More Info",
            link: ""
          }
        },
        {
          bgColor: "grey primary--text",
          btnColor: "primary--text",
          icon: "far fa-hourglass primary--text",
          title: "未完成",
          subtitle: "total",
          data: "78",
          action: {
            label: "More Info",
            link: ""
          }
        },
        {
          bgColor: "grey primary--text",
          btnColor: "primary--text",
          icon: "fas fa-check primary--text",
          title: "已完成",
          subtitle: "total",
          data: "780",
          action: {
            label: "More Info",
            link: ""
          }
        },
        {
          bgColor: "grey primary--text",
          btnColor: "primary--text",
          icon: "fas fa-percent primary--text",
          title: "完成比率",
          subtitle: "total",
          data: "53%",
          action: {
            label: "More Info",
            link: ""
          }
        }
      ]
    });
    return {
      // img1,
      score,
      category,
      title,
      menuItem,
      stats,
      selected
    };
  }
});
</script>
