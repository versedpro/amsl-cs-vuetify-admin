<template>
  <v-card flat tile width="300px">
    <v-card flat tile class="orange lighten-5">
      <v-card-text>{{ item.contactPhone }}</v-card-text>
      <v-card-text>{{ item.contactEmail }}</v-card-text>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "ExpandedDataTable",

  props: {
    item: Object
  }
});
</script>
