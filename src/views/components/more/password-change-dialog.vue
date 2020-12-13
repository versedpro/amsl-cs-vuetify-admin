<template>
  <div class="text-center">
    <v-dialog :value="show" width="500">
      <v-card>
        <v-card-title class="overline primary gold--text" color="primary">
          Update Password
        </v-card-title>
        <v-card-text class="pt-0 mt-0">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="New password" class="pa-0"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Confirm password" class="pa-0"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn rounded color="primary" text @click="handleCancel">Cancel</v-btn>
          <v-btn rounded color="primary" text @click="handleCancel">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "Dialog",
  props: {
    show: Boolean
  },
  setup(_, { emit }) {
    function handleCancel() {
      emit("on-delete-cancel");
    }
    return {
      handleCancel
    };
  }
});
</script>
