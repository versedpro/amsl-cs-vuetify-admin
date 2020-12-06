<template>
  <v-toolbar flat tile color="primary" class="white--text">
    <v-btn icon class="gold--text" @click="handleBackButton">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-toolbar-title class="gold--text">{{ title }}</v-toolbar-title>
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
