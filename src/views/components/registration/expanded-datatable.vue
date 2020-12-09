<template>
  <v-card flat tile>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field label="Age Group" v-model="registration.ageGroup"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field label="contactName" v-model="registration.contactName"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field label="contactEmail" v-model="registration.contactEmail"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field label="approvedBy" v-model="registration.approvedBy"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select :items="statuses" v-model="registration.statusFlag" label="Status"></v-select>
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
    const registration = ref(props.item);
    watchEffect(() => {
      registration.value = props.item;
    });

    function save() {
      const params = { registrationPhone: registration.value.registrationPhone };
      api.update(`/Registration/${props.item.salesOrderId}`, registration.value, { params });
    }

    return {
      registration,
      save,
      statuses
    };
  }
});
</script>
