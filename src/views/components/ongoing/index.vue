<template>
  <v-card flat tile height="calc(100vh - 50px)" class="pa-4" elevation="0">
    <v-window v-model="window" class="elevation-1" vertical>
      <v-window-item>
        <v-card-title class="primary justify-center gold--text"
          >{{ $t("ongoing.title") }}
        </v-card-title>

        <v-data-table
          class="elevation-1"
          :footer-props="defaultFooterProps"
          :headers="headers"
          :items="items"
          item-key="salesOrderId"
          show-expand
          :expanded.sync="expanded"
          :items-per-page="options.itemsPerPage"
          :loading="loading"
          :options.sync="options"
          :server-items-length="serverItemsLength"
          @update:options="handleUpdateOptions"
        >
          <!-- Top Slot -->
          <template v-slot:top>
            <datatable-orders-top-slot @on-search="handleSearch" @on-insert="handleInsert" />
          </template>

          <!-- createdTimestamp slot -->
          <template v-slot:[`item.createdTimestamp`]="{ value }">
            <datatable-iso-date :timestamp="value"> </datatable-iso-date>
          </template>

          <!-- expand slot -->
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <expanded-data-table :item="item" :staff="staff"></expanded-data-table>
            </td>
          </template>
        </v-data-table>
      </v-window-item>

      <!-- <v-window-item>
        <industry-input
          :mode="mode"
          :item="item"
          @on-input-cancel="handleInputCancel"
          @on-input-save="handleInputSave"
          @on-input-back="handleInputBack"
        >
        </industry-input>
      </v-window-item> -->
    </v-window>
  </v-card>
</template>

<script lang="ts">
import OngoingApi from "./api";

import { defaultFooterProps, mapOptions, sortParams, setSortOptions } from "@/utils/datatable";
import { DataOptions } from "vuetify";
import api from "@/api/crud";
// import { Industry } from "@/interfaces/industry";

import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "Ongoing",

  components: {
    // IndustryInput: () => import("./industry-input.vue"),
    // DatatableActionSlot: () => import("@/views/widget/datatable-action-slot.vue"),
    DatatableOrdersTopSlot: () => import("@/views/widget/datatable-orders-top-slot.vue"),
    DatatableIsoDate: () => import("@/views/widget/datatable-iso-date.vue"),
    ExpandedDataTable: () => import("./expanded-data-table.vue")
  },

  setup() {
    // datatable header
    const headers = ref([
      { text: "OrderId", value: "salesOrderId", align: "start" },
      { text: "ContactName", value: "contactName" },
      { text: "ContactPhone", value: "contactPhone" },
      { text: "ContactEmail", value: "contactEmail" },
      { text: "ContactOtherInfo", value: "contactOtherInfo" },
      { text: "CreatedTimestamp", value: "createdTimestamp" }
    ]);

    // datatable options
    const options = ref({
      sortBy: ["salesOrderId"],
      sortDesc: [],
      itemsPerPage: 10
    } as DataOptions);

    // Other datatable settings
    const filter = ref("");
    const loading = ref(false);
    const expanded = ref([]);
    const staff = ref([]);
    // const item = ref<Industry>({} as Industry);
    const items = ref([]);
    const item = ref({ supplierProductId: "" });
    const serverItemsLength = ref(0);
    const mode = ref("add");
    const showDialog = ref(false);
    const window = ref(0);

    // Other functions
    async function fetchData(pageNo, pageSize: number, sort?: string, filter?: string) {
      loading.value = true;

      try {
        const dtOptions = mapOptions(options.value);
        dtOptions["filter"] = filter;

        api.get("/SalesOrder/Datatable", dtOptions).then(({ data }) => {
          items.value = data.data || [];
          serverItemsLength.value = data.total;
          loading.value = false;
        });
      } catch (e) {
        // console.log("fetchData failed..", e);
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

    function fetchStaff() {
      api.get("/Staff").then(({ data }) => (staff.value = data));
    }
    fetchStaff();

    function handleDeleteCancel() {
      showDialog.value = false;
    }

    async function handleDeleteConfirm() {
      await api.delete(`/SalesOrder/${item.value.supplierProductId}`);
      showDialog.value = false;
      refreshData();
    }

    function handleInputBack() {
      window.value = 0;
    }

    function handleInputCancel() {
      window.value = 0;
    }

    function handleInputSave() {
      handleInputBack();
      refreshData();
    }

    function handleSearch(val) {
      filter.value = val;
    }

    return {
      defaultFooterProps,
      filter,
      headers,
      loading,
      items,
      expanded,
      staff,
      mode,
      options,
      serverItemsLength,
      showDialog,
      window,
      handleDeleteCancel,
      handleDeleteConfirm,
      handleInputBack,
      handleInputCancel,
      handleInputSave,
      handleSearch,
      handleUpdateOptions
    };
  }
});
</script>
