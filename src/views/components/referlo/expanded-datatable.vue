<template>
  <v-card flat tile>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field label="Registered Phone" v-model="referlo.registeredPhone"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field label="Referrer Id" v-model="referlo.referrerId"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field label="Referlo Alias" v-model="referlo.referloAlias"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field label="Referlo Email" v-model="referlo.referloEmail"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field label="Verified By" v-model="referlo.identityVerifiedBy"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field label="Age Group" v-model="referlo.ageGroup"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select :items="statuses" v-model="referlo.referloStatus" label="Status"></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-btn class="align-self-center" @click="save">Save</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "@vue/composition-api";
import api from "@/api/crud";

export default defineComponent({
  name: "ExpandedDataTable",

  props: {
    item: Object
  },

  setup(props) {
    const statuses = [
      { value: 0, text: "submit" },
      { value: 1, text: "sale assign" },
      { value: 2, text: "completed" }
    ];
    const referlo = ref(props.item);
    watchEffect(() => {
      referlo.value = props.item;
    });

    function save() {
      api.update(`/Referlo/${props.item.referloId}`, referlo.value);
    }

    return {
      referlo,
      save,
      statuses
    };
  }
});
</script>
