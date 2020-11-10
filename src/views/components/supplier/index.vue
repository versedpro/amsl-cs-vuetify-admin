<template>
  <v-card class="red">
    <v-card-title> Industries</v-card-title>

    <v-data-table :headers="headers" :items="industries" :items-per-page="5" class="elevation-1">
      <!-- Top Slot -->
      <template v-slot:top>
        <datatable-top-slot></datatable-top-slot>
      </template>

      <!-- Action Slot -->
      <template v-slot:[`item.actions`]="{ item }">
        <datatable-action-slot
          @on-update="onUpdate(item)"
          @on-delete="onDelete(item)"
        ></datatable-action-slot>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import { Industries } from "@/demo/api/mock_industry_list";

export default defineComponent({
  name: "Supplier",

  components: {
    DatatableActionSlot: () => import("@/views/widget/datatable-action-slot.vue"),
    DatatableTopSlot: () => import("@/views/widget/datatable-top-slot.vue")
  },

  setup() {
    const itemsPerPage = ref(4);
    const title = "資訊中心";
    const industries = ref(Industries);

    const headers = ref([
      {
        text: "Id",
        align: "start",
        sortable: false,
        value: "id"
      },
      { text: "Name", value: "name" },
      { text: "Title", value: "title" },
      { text: null, value: "actions", sortable: false, align: "right" }
    ]);

    function onUpdate(item) {
      console.log(item.name);
    }

    function onDelete(item) {
      console.log(item.title);
    }

    return {
      itemsPerPage,
      industries,
      headers,
      title,
      onUpdate,
      onDelete
    };
  }
});
</script>
