<template>
  <v-sheet class="red">
    <v-data-table :headers="headers" :items="suppliers" :items-per-page="5" class="elevation-1">
      <!-- Top Slot -->
      <template v-slot:top>
        <v-toolbar text color="red lighten-5" elevation="0">
          <datatable-search></datatable-search>
          <v-spacer class="hidden-xs-only"></v-spacer>

          <v-btn-toggle v-model="toggle_exclusive" color="primary" borderless dense group>
            <v-btn :value="1" text>
              <v-icon>mdi-printer</v-icon>
            </v-btn>

            <v-btn :value="2" text>
              <v-icon>mdi-refresh</v-icon>
            </v-btn>

            <v-btn :value="3" text>
              <v-icon>mdi-plus</v-icon>
              <!-- <v-icon>mdi-plus-circle-outline</v-icon> -->
            </v-btn>
          </v-btn-toggle>
        </v-toolbar>
      </template>

      <!-- Action Slot -->

      <!-- <template v-slot:[`item.actions`]="{ item }">
        <edit-button @click="editItem(item)"> </edit-button>
        <delete-dialog :item="item" title="Delete Licence Number" @onDelete="handleDelete" />
      </template> -->

      <!-- <template v-slot:item.DateTimeModified="{ item }">
        <format-date :dateStr="item.DateTimeModified"></format-date>
      </template> -->
    </v-data-table>
  </v-sheet>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import { suppliers } from "@/demo/api/mock_suppliers";

export default defineComponent({
  name: "Supplier",

  components: {
    DatatableSearch: () => import("@/views/widget/datatable-search.vue")
  },

  setup() {
    const itemsPerPage = ref(4);
    // const desserts = ref(Items);
    const title = "資訊中心";

    const headers = ref([
      {
        text: "Id",
        align: "start",
        sortable: false,
        value: "supplierId"
      },
      { text: "Name", value: "supplierName" },
      { text: "Actions", value: "actions", sortable: false, align: "right" }
    ]);

    return {
      itemsPerPage,
      suppliers,
      headers,
      title
    };
  }
});
</script>
