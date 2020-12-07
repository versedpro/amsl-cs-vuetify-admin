<template>
  <v-main class="pb-0">
    <v-sheet tile class="mx-auto pa-4" max-width="960" height="100%">
      <transition name="fade-transform" mode="out-in">
        <router-view />
      </transition>
      <!-- <the-bottom-navigation /> -->
    </v-sheet>
  </v-main>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "TheContent"
});
</script>
