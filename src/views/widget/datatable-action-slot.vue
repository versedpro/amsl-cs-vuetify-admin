<template>
  <v-btn-toggle color="primary" borderless dense group>
    <v-btn :value="1" text @click="handleUpdate">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>

    <v-btn :value="2" text @click="handleDelete">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "DatatableActionSlot",

  setup() {
    const filterText = ref("");

    function handleUpdate() {
      this.$emit("on-update");
    }

    function handleDelete() {
      this.$emit("on-delete");
    }

    return {
      filterText,
      handleUpdate,
      handleDelete
    };
  }
});
</script>
