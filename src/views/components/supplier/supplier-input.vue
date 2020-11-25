<template>
  <v-dialog :value="show" max-width="500px" @click:outside="handleCancel">
    <v-form ref="form" lazy-validation>
      <v-card>
        <v-card-title class="py-1 px-3">
          <span>{{ title }}</span>
          <v-spacer></v-spacer>
          <!-- Close button -->
          <v-btn text icon color="primary" @click="handleCancel">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  :value="item.supplierId"
                  @input="$emit('on-item-changed', 'supplierId', $event)"
                  label="Id"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  :value="item.supplierName"
                  @input="$emit('on-item-changed', 'supplierName', $event)"
                  label="Name"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn rounded color="primary" text @click="handleCancel">{{ $t("input.cancel") }}</v-btn>
          <v-btn rounded text @click="handleSave">
            {{ $t("input.save") }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "supplier-input",

  props: {
    show: Boolean,
    title: String,
    item: Object
  },

  setup() {
    function handleCancel() {
      this.$emit("on-cancel-input");
    }

    function handleSave() {
      this.$emit("on-save-input");
    }

    return {
      // update,
      handleCancel,
      handleSave
    };
  }
});
</script>
