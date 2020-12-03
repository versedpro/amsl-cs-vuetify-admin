<template>
  <v-container grid-list-lg class="my-5">
    <v-layout wrap>
      <v-flex xs12>
        <h4 class="overline font-weight-bold">SupplierProductId</h4>
        <h2>{{ item.contactName }}</h2>
      </v-flex>
      <v-flex xs12 class="my-3">
        <v-divider></v-divider>
      </v-flex>
      <v-flex xs2>
        <h4 class="overline font-weight-bold">SupplierOtherInfo</h4>
        <p class="body-1">{{ item.supplierOtherInfo }}</p>
      </v-flex>
      <v-flex xs2>
        <h4 class="overline font-weight-bold">SupplierSalesAdmin</h4>
        <p class="body-1">{{ item.supplierSalesAdmin }}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "ExpandedDataTable",
  props: {
    item: Object
  },
  components: {
    // RepairStatusBtnGroup: () => import("./repair-status-btn-group.vue")
  }
  // setup() {
  //   const industries = ref(Industries);
  //   return {
  //     industries
  //   };
  // }
});

// @Component({
//   components: {
//     RepairStatusBtnGroup: () => import("@/components/button/repair-status-btn-group.vue")
//   }
// })
// export default class ExpandedDataTable extends Vue {}
</script>

<style scoped>
.theme--light.v-data-table
  tbody
  tr:hover:not(.v-data-table__expand-row):not(.v-data-table__empty-wrapper) {
  background: rgba(255, 255, 255, 0.7) !important;
}
</style>
