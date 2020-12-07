<template>
  <v-dialog :value="show" max-width="500px" @click:outside="handleCancel">
    <v-card>
      <v-card-title class="py-1 px-3">
        {{ title }}
        <v-spacer></v-spacer>
        <v-btn text icon color="primary" @click="handleCancel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn rounded color="primary" text @click="handleCancel">Cancel</v-btn>
        <v-btn rounded text @click="handleDelete">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "datatable-delete-dialog",

  props: {
    id: Number,
    name: String,
    title: String,
    show: Boolean
  },

  setup(_, { emit }) {
    function handleCancel() {
      emit("on-delete-cancel");
    }

    function handleDelete() {
      emit("on-delete-confirm", this.id);
    }
    return {
      handleCancel,
      handleDelete
    };
  }
});
</script>
