<template>
  <v-toolbar text color="red lighten-5" elevation="0">
    <!-- <datatable-search></datatable-search> -->
    <v-text-field
      v-model="filterText"
      placeholder="search"
      append-icon="mdi-magnify"
      clear-icon="clear"
      clearable
      hide-details
      @keyup.enter="handleFilter"
      @click:append="handleFilter"
      @click:clear="handleReset"
    ></v-text-field>
    <v-spacer class="hidden-xs-only"></v-spacer>

    <v-btn-toggle color="primary" borderless dense group>
      <v-btn :value="1" text>
        <v-icon>mdi-printer</v-icon>
      </v-btn>

      <v-btn :value="2" text>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>

      <v-btn :value="3" text>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-btn-toggle>
  </v-toolbar>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "DatatableTopSlot",

  setup() {
    const filterText = ref("");

    function handleFilter() {
      // $store
    }

    function handleReset() {
      filterText.value = "";
      // $store
    }

    return {
      filterText,
      handleFilter,
      handleReset
    };
  }
});
</script>
