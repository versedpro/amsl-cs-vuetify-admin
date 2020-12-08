<template>
  <v-card class="mx-auto" max-width="960" height="100%" tile>
    <v-card-title class="primary justify-center gold--text">
      {{ $t("home.title") }}
    </v-card-title>

    <v-container id="dashboard" fluid grid-list-lg>
      <v-layout wrap>
        <v-flex xs12 sm6 v-for="(stat, index) in stats.monthlyStats" v-bind:key="index">
          <v-card :class="stat.bgColor" dark class="pa-5" elevation="0">
            <v-card-title>
              {{ $t(stat.title) }}
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
    const stats = ref({
      monthlyStats: [
        {
          bgColor: "grey primary--text",
          btnColor: "primary--text",
          icon: "fas fa-folder-plus primary--text",
          title: "dashboard.new",
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
          title: "dashboard.ongoing",
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
          title: "dashboard.successful",
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
          title: "dashboard.rejected",
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
      stats
    };
  }
});
</script>
