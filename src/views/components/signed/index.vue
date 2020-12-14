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

          <!-- createdTimestamp slot -->
          <template v-slot:[`item.createdTimestamp`]="{ value }">
            <datatable-iso-date :timestamp="value"> </datatable-iso-date>
          </template>

          <!-- expand slot -->
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length" class="pa-0">
              <expanded-data-table :item="item" :staff="staff"></expanded-data-table>
            </td>
          </template>
          <!-- Action Slot -->
          <template v-slot:[`item.actions`]="{ item }">
            <a @click="openChat(item)"
              ><v-btn class="ma-2" text icon color="gold">
                <v-icon>mdi-chat</v-icon>
              </v-btn></a
            >
          </template>
        </v-data-table>
      </v-window-item>
      <v-window-item>
        <a @click="backToHistory">Back</a>
        <orders-chat
          v-if="destroyChat"
          :orderId="chatOrderId"
          :referloId="chatReferloId"
          :isActive="true"
        ></orders-chat>
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
    ExpandedDataTable: () => import("./ongoing-expandable.vue"),
    OrdersChat: () => import("../chat/orders-chat.vue")
  },

  setup() {
    // datatable header
    const headers = ref([
      { text: "Order#", value: "salesOrderId", align: "start" },
      { text: "ContactName", value: "contactName" },
      { text: "ContactPhone", value: "contactPhone" },
      { text: "ContactEmail", value: "contactEmail" },
      { text: "SupplierProductId", value: "supplierProductId" },
      { text: "CreatedTimestamp", value: "createdTimestamp" },
      { text: null, value: "actions", sortable: false, align: "right" }
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

    const chatOrderId = ref(0);
    const chatReferloId = ref(0);
    const destroyChat = ref(true);

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

    function openChat(item) {
      destroyChat.value = true;
      chatOrderId.value = item.salesOrderId;
      chatReferloId.value = item.referloId;
      window.value = 1;
    }

    function backToHistory() {
      window.value = 0;
      destroyChat.value = false;
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
      // handleDeleteConfirm,
      handleInputBack,
      handleInputCancel,
      handleInputSave,
      handleRefresh,
      handleSearch,
      handleUpdateOptions,
      openChat,
      backToHistory,
      chatOrderId,
      chatReferloId,
      destroyChat
    };
  }
});
</script>
