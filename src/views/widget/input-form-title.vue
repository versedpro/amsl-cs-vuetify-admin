<template>
  <v-toolbar flat tile color="primary" class="white--text">
    <v-btn icon class="white--text" @click="handleBackButton">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-toolbar-title>{{ title }}</v-toolbar-title>
  </v-toolbar>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "InputFormTitle",

  props: {
    title: String
  },

  setup(_, { emit }) {
    function handleBackButton() {
      emit("on-back-button");
    }

    return {
      handleBackButton
    };
  }
});
</script>
