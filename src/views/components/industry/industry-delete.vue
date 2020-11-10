<template>
  <v-dialog v-model="show" max-width="500px" transition="dialog-transition">
    <v-card>
      <!-- Dialog Title -->
      <v-card-title class="py-1 px-3">
        <span>{{ title }}</span>
        <v-spacer></v-spacer>
        <!-- Close button -->
        <v-btn text icon color="primary" @click="show = false">
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
        <v-btn color="error darken-1" text @click="show = false">Cancel</v-btn>
        <v-btn color="green darken-1" text @click="action">Okay</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, watch, SetupContext, ref } from "@vue/composition-api";
export default defineComponent({
  props: {
    value: Boolean,
    title: String
  },

  setup(props, context: SetupContext) {
    const show = ref(props.value);
    watch(show, (val: boolean) => {
      if (!val) {
        context.emit("input", val);
      }
    });
    function action() {
      // Do anything here if pressed okay
    }
    return {
      show,
      action
    };
  }
});
</script>
