<template>
  <v-dialog :value="show" max-width="500px">
    <v-card>
      <v-card-title class="py-1 px-3">
        <span>{{ title }}</span>
        <v-spacer></v-spacer>
        <!-- Close button -->
        <v-btn text icon color="primary" @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field :value="item.id" @input="$emit('item-changed', 'id', $event)" label="Id"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field :value="item.name" @input="$emit('item-changed', 'name', $event)" label="Name"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field :value="item.title" @input="$emit('item-changed', 'title', $event)" label="Title"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('close')"> Cancel </v-btn>
        <v-btn color="blue darken-1" text @click="$emit('confirm', item)"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "industry-dialog",

  props: {
    show: Boolean,
    title: String,
    item: Object
  },

  setup() {
    function update(key) {
      this.$emit("item-changed", key, this.item[key]);
    }
    return {
      update
    };
  }
});
</script>
