<template>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn rounded color="primary" text @click="handleCancel">{{ $t("input.cancel") }} </v-btn>
    <v-btn rounded text :disabled="invalid" @click="handleSave">{{ $t("input.save") }} </v-btn>
  </v-card-actions>
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
