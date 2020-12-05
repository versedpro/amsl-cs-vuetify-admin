<template>
  <v-card height="calc(100vh - 50px)" class="pa-4" elevation="0">
    <v-window v-model="window" class="elevation-1" vertical>
      <v-window-item>
    <v-alert border="bottom" dense class="pa-4 ma-0 primary rounded-b-0">
      <p class="ma-0 gold--text text-center text-uppercase">INDUSTRIES</p>
    </v-alert>

    <v-data-table
      class="elevation-1"
      :footer-props="defaultFooterProps"
      :headers="headers"
      :items="items"
      :items-per-page="options.itemsPerPage"
      :loading="loading"
      :options.sync="options"
      :server-items-length="serverItemsLength"
      @update:options="handleUpdateOptions"
    >
      <!-- Top Slot -->
      <template v-slot:top>
        <datatable-top-slot @on-search="handleSearch" @on-item-add="onAdd()"></datatable-top-slot>
      </template>

      <!-- Action Slot -->
      <template v-slot:[`item.actions`]="{ item }">
        <datatable-action-slot
          @on-update="handleUpdate(item)"
          @on-delete="onDelete(item.industryId)"
          class="gold--text"
        >
        </datatable-action-slot>
      </template>
    </v-data-table>
    </v-window-item>
    <v-window-item>
      <industry-input
      @on-cancel-input="onCancelInput"
      ></industry-input>
    </v-window-item>
    </v-window>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import IndustryApi from "./api";
import { defaultFooterProps, mapOptions, sortParams, setSortOptions } from "@/utils/datatable";
import { DataOptions } from "vuetify";
import IndustryInput from "../completed/industry-input.vue";

export default defineComponent({
  name: "Industry",

  components: {
    IndustryInput: () => import("./industry-input.vue"),
    DatatableActionSlot: () => import("@/views/widget/datatable-action-slot.vue"),
    DatatableTopSlot: () => import("@/views/widget/datatable-top-slot.vue")
  },

  setup() {
    // datatable header
    const headers = ref([
      { text: "Id", align: "start", sortable: false, value: "industryId" },
      { text: "Name", value: "industryName" },
      { text: "Created", value: "createdTimestamp" },
      { text: null, value: "actions", sortable: false, align: "right" }
    ]);

    // datatable options
    const options = ref({ sortBy: ["industryId"], sortDesc: [], itemsPerPage: 10 } as DataOptions);

    // Other datatable settings
    const loading = ref(false);
    const items = ref([]);
    const filter = ref("");
    const serverItemsLength = ref(0);

    // Other variables
    async function fetchData(pageNo, pageSize: number, sort?: string, filter?: string) {
      loading.value = true;

      try {
        // debugger;
        const dtOptions = mapOptions(options.value);
        dtOptions["filter"] = filter;

        IndustryApi.datatable(dtOptions).then(({ data }) => {
          // console.log(JSON.stringify(data));
          items.value = data.data || [];
          serverItemsLength.value = data.total;
          loading.value = false;
        });
      } catch (e) {
        console.log("fetchDepots failed..", e);
      } finally {
        loading.value = false;
      }
    }

    const handleUpdateOptions = (opt: DataOptions) => {
      const { itemsPerPage, sortBy, sortDesc } = opt;
      setSortOptions(options.value, sortBy, sortDesc);
      options.value.itemsPerPage = itemsPerPage;
      refreshData();
    };

    function refreshData() {
      const params = sortParams(options.value);
      fetchData(options.value.page, options.value.itemsPerPage, params, filter.value);
    }

    function handleSearch(event) {
      console.log(event);
    }

    function handleUpdate(event) {
      console.log(event);
    }
    const window = ref(0);
    function onCancelInput() {
      window.value = 0;
    }
     function onAdd() {
      window.value = 1;
    }
    return {
      defaultFooterProps,
      loading,
      headers,
      options,
      items,
      filter,
      serverItemsLength,
      handleSearch,
      handleUpdate,
      handleUpdateOptions,
      onCancelInput,
      window,
      onAdd,
    };
  }
});
</script>
