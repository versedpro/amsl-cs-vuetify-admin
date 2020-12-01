<template>
  <v-card tile class="mx-auto" height="auto">
    <v-card-title class="primary justify-center display-1 text-h5 white--text">
      {{ title }}
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "News",

  setup() {
    const title = "News";

    return {
      title
    };
  }
});
</script>
