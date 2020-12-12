<template>
  <v-card class="mx-auto">
    <input-form-title :title="$t('about.title')" @on-back-button="handleBackButton" />

    <v-card-title>{{ $t("about.version") }}</v-card-title>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "Settings",

  components: {
    InputFormTitle: () => import("@/views/widget/input-form-title.vue")
  },

  setup() {
    function handleBackButton() {
      console.log("go back");
    }

    return {
      handleBackButton
    };
  }
});
</script>
