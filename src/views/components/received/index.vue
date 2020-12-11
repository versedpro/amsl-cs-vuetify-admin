<template>
  <v-card flat tile height="calc(100vh - 50px)" class="pa-4" elevation="0">
    <v-window v-model="window" class="elevation-1" vertical>
      <v-window-item>
        <v-card-title class="primary justify-center gold--text"
          >{{ $t("received.title") }}
        </v-card-title>

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
          item-key="salesOrderId"
          show-expand
          single-expand
          :expanded.sync="expanded"
        >
          <!-- Top Slot -->
          <template v-slot:top>
            <datatable-orders-top-slot @on-refresh="handleRefresh" @on-search="handleSearch" />
          </template>

          <!-- salesOrderId slot -->
          <template v-slot:[`item.salesOrderId`]="{ item }">
            <a @click="onOrderClick(item.salesOrderId)">{{ item.salesOrderId }}</a>
          </template>

          <!-- createdTimestamp slot -->
          <template v-slot:[`item.createdTimestamp`]="{ value }">
            <datatable-iso-date :timestamp="value"> </datatable-iso-date>
          </template>

          <!-- expand slot -->
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length" class="pa-0">
              <received-expandable :item="item" :staff="staff"></received-expandable>
            </td>
          </template>
        </v-data-table>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script lang="ts">
import api from "@/api/crud";

import { defaultFooterProps, mapOptions, sortParams, setSortOptions } from "@/utils/datatable";
import { DataOptions } from "vuetify";

import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "Ongoing",

  components: {
    DatatableOrdersTopSlot: () => import("@/views/widget/datatable-orders-top-slot.vue"),
    DatatableIsoDate: () => import("@/views/widget/datatable-iso-date.vue"),
    ReceivedExpandable: () => import("./received-expandable.vue")
  },

  setup(_, { root }) {
    // datatable header
    const headers = ref([
      { text: "Order#", value: "salesOrderId", align: "start" },
      { text: "ContactName", value: "contactName" },
      { text: "ContactPhone", value: "contactPhone" },
      { text: "ContactEmail", value: "contactEmail" },
      { text: "SupplierProductId", value: "supplierProductId" },
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

    const items = ref([]);
    // const item = ref({ supplierProductId: "" });
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
        });
      } catch (e) {
        // console.log("fetchData failed..", e);
      } finally {
        setTimeout(() => {
          loading.value = false;
        }, 300);
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

    // async function handleDeleteConfirm() {
    //   await api.delete(`/SalesOrder/${item.value.supplierProductId}`);
    //   showDialog.value = false;
    //   refreshData();
    // }

    function handleInputBack() {
      window.value = 0;
    }

    function handleInputCancel() {
      window.value = 0;
    }

    function onOrderClick(orderId) {
      root.$router.push({ name: 'order.detail', params: { orderId }})
    }

    function handleInputSave() {
      handleInputBack();
      refreshData();
    }

    function handleRefresh() {
      loading.value = true;
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
      onOrderClick,
      // handleDeleteConfirm,
      handleInputBack,
      handleInputCancel,
      handleInputSave,
      handleRefresh,
      handleSearch,
      handleUpdateOptions
    };
  }
});
</script>