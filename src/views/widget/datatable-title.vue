<template>
  <v-card-title class="primary justify-center gold--text">{{ title }} </v-card-title>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "DatatableTitle",

  props: {
    title: String
  }
});
</script>
