<template>
  <div class="d-flex ma-10">
    <div md="6" class="mr-2">
      <v-select
        :items="staff"
        v-model="staffId"
        item-text="staffAlias"
        item-value="staffId"
        label="Staff"
      ></v-select>
    </div>
    <v-btn class="align-self-center" @click="save">Save</v-btn>
  </div>
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
