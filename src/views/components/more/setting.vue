<template>
  <v-card tile class="mx-auto" height="auto">
    <v-card-title class="primary justify-center display-1 text-h5 white--text">
      {{ title }}
    </v-card-title>

    <v-btn block @click.stop="dialog = true">
      <v-card-text v-html="language"></v-card-text>
      <v-spacer></v-spacer>
      <v-icon>mdi-menu-down</v-icon>
    </v-btn>

    <v-dialog
      v-model="dialog"
      scrollable
      persistent
      max-width="300px"
    >
      <v-card>
        <v-card-text style="height: 300px;">
          <v-radio-group
            v-model="language"
            column
            @change="dialog = false"
          >
            <v-radio
              label="English"
              value="english"
            ></v-radio>
            <v-radio
              label="中文"
              value="chinese"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "Setting",

  setup() {
    const title = "Setting";
    const dialog = ref(false);
    const language = ref("English");

    return {
      title,
      dialog,
      language
    };
  }
});
</script>
