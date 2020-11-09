<template>
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
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "DatatableSearch",

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
