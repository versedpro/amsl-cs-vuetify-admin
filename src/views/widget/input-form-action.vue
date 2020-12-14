<template>
  <v-alert border="top" color="gold" colored-border class="rounded-0 grey lighten-3 mb-0">
    <v-card-actions class="pa-0">
      <v-spacer></v-spacer>
      <v-btn rounded color="primary" text @click="handleCancel">{{ $t("input.cancel") }} </v-btn>
      <v-btn rounded text :disabled="invalid" @click="handleSave">{{ $t("input.save") }} </v-btn>
    </v-card-actions>
  </v-alert>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "InputFormAction",

  props: {
    invalid: Boolean
  },

  setup(_, { emit }) {
    function handleCancel() {
      emit("on-cancel");
    }

    function handleSave() {
      emit("on-save");
    }
    return {
      handleCancel,
      handleSave
    };
  }
});
</script>
