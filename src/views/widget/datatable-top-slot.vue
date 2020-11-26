<template>
<v-alert border="bottom" color="gold" colored-border class="ma-0 pa-0 rounded-b-0"
      >
  <v-toolbar text color="grey" elevation="0">
    <!-- <datatable-search></datatable-search> -->
    <v-text-field
      placeholder="search"
      append-icon="mdi-magnify"
      clear-icon="mdi-close"
      clearable
      hide-details
      @input="$emit('on-search', $event)"
      @keyup.enter="handleFilter"
      @click:append="handleFilter"
      @click:clear="handleReset"
    ></v-text-field>
    <v-spacer class="hidden-xs-only"></v-spacer>

    <v-btn-toggle borderless dense group>
      <v-btn :value="1" text class="white--text" >
        <v-icon>mdi-printer</v-icon>
      </v-btn>

      <v-btn :value="2" text class="white--text">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>

      <v-btn @click="$emit('on-item-add')" :value="3" text class="accent--text text--lighten-5">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-btn-toggle>
  </v-toolbar>
  </v-alert>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "DatatableTopSlot",

  setup() {

    function handleFilter() {
      // $store
    }

    function handleReset() {
      // $store
    }

    return {
      handleFilter,
      handleReset
    };
  }
});
</script>
