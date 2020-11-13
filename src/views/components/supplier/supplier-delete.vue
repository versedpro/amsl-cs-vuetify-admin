<template>
  <v-dialog :value="show" max-width="500px" transition="dialog-transition">
    <v-card>
      <!-- Dialog Title -->
      <v-card-title class="py-1 px-3">
        <span>{{ title }}</span>
        <v-spacer></v-spacer>
        <!-- Close button -->
        <v-btn text icon color="primary" @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <!-- Dialog Body -->
      </v-card-text>
      <!-- Dialog Action Buttons -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error darken-1" text @click="$emit('close')">Cancel</v-btn>
        <v-btn color="green darken-1" text @click="$emit('confirm')">Okay</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
export default defineComponent({
  name: "industry-delete",
  props: {
    show: Boolean,
    title: String
  }
});
</script>
