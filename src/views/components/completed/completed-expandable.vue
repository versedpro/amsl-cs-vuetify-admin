<template>
  <!-- <div class="d-flex ma-10"> -->
  <v-card flat tile width="300px">
    <v-card flat tile class="orange lighten-5">
      <v-card-text>{{ item.supplierSalesAdmin }}</v-card-text>
      <v-card-text>{{ item.contactPhone }}</v-card-text>
      <v-card-text>{{ item.contactEmail }}</v-card-text>
      <v-card-text>{{ item.pointsDefault }}</v-card-text>
      <v-card-text>{{ item.pointsDefault }}</v-card-text>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import api from "@/api/crud";

export default defineComponent({
  name: "ExpandedDataTable",

  props: {
    item: Object,
    staff: Array
  },

  setup(props) {
    const staffId = ref(0);

    function save() {
      const data = {
        ...props.item,
        supplierSalesId: staffId.value
      };
      api.update(`/SalesOrder/${props.item.salesOrderId}`, data);
    }

    return {
      staffId,
      save
    };
  }
});
</script>
