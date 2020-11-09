<template>
  <v-footer absolute class="primary lighten-2">
    <v-card-text class="py-2 secondary--text text-center">
      <!-- <span> &copy;Referlo {{ new Date().getFullYear() }} — </span> -->
      <span> &copy;Referlo {{ year() }} — </span>
      <span>{{ company }}</span>
    </v-card-text>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "TheFooter",
  components: {},
  setup() {
    const company = ref("AMSL Limited");

    function year() {
      return new Date().getFullYear();
    }

    return {
      company,
      year
    };
  }
});
</script>
