<template>
  <v-card height="calc(100vh - 50px)" class="pa-4" elevation="0">
    <v-alert border="bottom" dense class="pa-4 ma-0 primary rounded-b-0"
      ><p class="ma-0 gold--text text-center text-uppercase">ORDERS IN PROCESS</p>
    </v-alert>

    <v-data-table
      class="elevation-0 mt-5"
      :headers="headers"
      :items="items"
      :items-per-page="options.itemsPerPage"
      :loading="loading"
      :options.sync="options"
      :server-items-length="serverItemsLength"
      @update:options="handleUpdateOptions"
      item-key="id"
      show-expand
      single-expand
      :expanded.sync="expanded"
    >
      <!-- Top Slot -->
      <template v-slot:top>
        <datatable-top-slot
          @on-search="onSearch($event)"
          @on-item-add="onAdd()"
        ></datatable-top-slot>
        <industry-input
          :show="dialog"
          :item="editedItem"
          :title="dialogTitle"
          @on-item-changed="(key, value) => (editedItem[key] = value)"
          @on-cancel-input="onCancelInput"
          @on-save-input="onSaveInput"
        ></industry-input>
      </template>

      <template v-slot:expanded-item="{ item , headers }"  >
        <td :colspan="headers.length" class="orange lighten-5 pa-0">
          <expanded-data-table  :item="item"></expanded-data-table>
        </td>
      </template>

      <template v-slot:item.DateTimeCreated="{ item }">
        <span>{{ getIsoDate(item.DateTimeCreated) }}</span>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import IndustryApi from "./api";
import { mapOptions } from "@/utils/datatable";
import _ from "lodash";
import moment from "moment";
// import func from "vue-temp/vue-editor-bridge";

export default defineComponent({
  name: "Orders",
  components: {
    // DatatableActionSlot: () => import("@/views/widget/datatable-action-slot.vue"),
    DatatableTopSlot: () => import("@/views/widget/datatable-top-slot.vue"),
    IndustryInput: () => import("./industry-input.vue"),
    ExpandedDataTable: () => import("./expanded-data-table.vue")
  },

  setup() {
    const headers = ref([
      { text: "OrderId", sortable: false, align: "start", value: "salesOrderId" },
      { text: "ReferloId", sortable: false, value: "referloId" },
      { text: "ContactName", sortable: false, value: "contactName" },
      { text: "ContactPhone", sortable: false, value: "contactPhone" },
      { text: "ContactEmail", sortable: false, value: "contactEmail" },
      { text: "ContactOtherInfo", sortable: false, value: "contactOtherInfo" },
      { text: "CreatedTimestamp", sortable: false, value: "createdTimestamp" }
    ]);

    const loading = ref(false);
    const items = ref([]);
    const item = ref({});
    const filter = ref("");
    const serverItemsLength = ref(0);
    const dialogTitle = ref("");
    const editedIndex = ref(-1);
    const dialog = ref(false);
    const editedItem = ref({
      industryName: "",
      industryId: "",
      description: "",
      status: 0
    });
    const defaultItem = ref({
      industryName: "",
      industryId: "",
      description: "",
      status: 0
    });

    const options = ref({
      itemsPerPage: 10,
      page: 1,
      sortBy: "",
      sortDesc: true
    });
    const expanded = ref([]);

    const chips = ref(["Programming", "Playing video games", "Watching movies", "Sleeping"]);
    const chipItems = ref(["Streaming", "Eating"]);

    function handleRefresh() {
      refreshData();
    }

    function handleUpdateOptions(opt) {
      const { page, itemsPerPage, sortBy, sortDesc } = opt;
      setSortOptions(sortBy, sortDesc);
      options.value.itemsPerPage = itemsPerPage;
      options.value.page = page;
      refreshData();
    }

    function sortParams() {
      return _.zipWith(options.value.sortBy, options.value.sortDesc, function (by, isDesc) {
        return isDesc ? by + "|desc" : by;
      }).join(",");
    }

    function setSortOptions(sortBy, sortDesc) {
      if (sortBy.length > 0 && options.value.sortBy != sortBy) {
        options.value.sortBy = sortBy;
      }
      if (sortDesc.length > 0 && options.value.sortDesc != sortDesc) {
        options.value.sortDesc = sortDesc;
      } else if (sortBy.length <= 0) {
        options.value.sortDesc = options.value.sortDesc ? false : true;
        options.value.sortBy = sortBy;
        options.value.sortDesc = sortDesc;
      }
    }

    function getIsoDate(dateStr) {
      return moment(dateStr).format("YYYY-MM-DD hh:mm");
    }

    function refreshData() {
      sortParams();
      fetchData();
    }

    async function fetchData() {
      loading.value = true;
      try {
        debugger;
        const dtOptions = mapOptions(options.value);
        dtOptions["filter"] = filter.value;
        const response = await IndustryApi.fetchOrders(dtOptions.page, dtOptions.per_page);
        items.value = response.data["data"];
        serverItemsLength.value = response.data["total"];
      } catch (e) {
        console.log("fetchDepots failed..", e);
      } finally {
        loading.value = false;
      }
    }

    function onCancelInput() {
      this.close();
    }

    function onUpdate(item) {
      editedIndex.value = items.value.indexOf(item);
      editedItem.value = Object.assign({}, item);
      dialog.value = true;
      dialogTitle.value = "Edit Order";
    }

    function onSearch(value) {
      filter.value = value;
      refreshData();
    }

    function onAdd() {
      editedIndex.value = -1;
      dialog.value = true;
      dialogTitle.value = "Add new";
    }

    async function onDelete(item) {
      await IndustryApi.delete(item.industryId);
      items.value.splice(items.value.indexOf(item), 1);
    }

    function close() {
      dialog.value = false;
      this.$nextTick(() => {
        editedItem.value = Object.assign({}, this.defaultItem);
        editedIndex.value = -1;
      });
    }

    function onSaveInput() {
      loading.value = true;
      if (this.editedIndex > -1) {
        IndustryApi.update(editedItem.value.industryId, editedItem.value).then(({ data }) => {
          Object.assign(items.value[editedIndex.value], data);
          loading.value = false;
        });
      } else {
        IndustryApi.create(editedItem.value).then(({ data }) => {
          items.value.push(data);
          loading.value = false;
        });
      }
      this.close();
    }

    return {
      headers,
      loading,
      items,
      item,
      filter,
      editedIndex,
      editedItem,
      defaultItem,
      serverItemsLength,
      dialogTitle,
      options,
      dialog,
      expanded,
      chips,
      chipItems,
      getIsoDate,
      handleRefresh,
      handleUpdateOptions,
      refreshData,
      fetchData,
      setSortOptions,
      sortParams,
      onCancelInput,
      onUpdate,
      onSearch,
      onAdd,
      onDelete,
      close,
      onSaveInput
    };
  }
});
</script>
