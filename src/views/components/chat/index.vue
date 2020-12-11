<template>
  <v-card tile class="mx-auto" height="100%">
    <v-toolbar dark color="primary">
      <v-btn icon @click="prev">
        <v-icon large>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title class="primary justify-center display-1 text-h5 white--text">
        {{ title }}
      </v-toolbar-title>
    </v-toolbar>
    <orders-chat :orderId="$route.params.orderId"></orders-chat>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "OrdersChatDetail",

  components: {
    OrdersChat: () => import("./orders-chat.vue")
  },
  setup(props, { root }) {
    const title = "訂單詳情";

    const prev = () => root.$router.back();

    return {
      title,
      prev
    };
  }
});
</script>
