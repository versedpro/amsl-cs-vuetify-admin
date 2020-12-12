<template>
  <v-card height="calc(100vh - 50px)" elevation="0">
    <v-window v-model="window" class="elevation-1" vertical>
      <v-window-item>
        <datatable-title :title="$t('product.title')"></datatable-title>

        <v-data-table
          class="elevation-1 grey lighten-3"
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
            <datatable-top-slot
              @on-refresh="handleRefresh"
              @on-search="handleSearch"
              @on-insert="handleInsert"
            />
          </template>

          <!-- Action Slot -->
          <template v-slot:[`item.actions`]="{ item }">
            <datatable-action-slot @on-update="handleEdit(item)" @on-delete="handleDelete(item)">
            </datatable-action-slot>
          </template>

          <!-- createdTimestamp slot -->
          <template v-slot:[`item.createdTimestamp`]="{ value }">
            <datatable-iso-date :timestamp="value"> </datatable-iso-date>
          </template>

          <!-- Name slot -->
          <template v-slot:[`item.productLocalized`]="{ value }">{{ fn2(value) }} </template>
        </v-data-table>
      </v-window-item>

      <v-window-item>
        <product-input
          :mode="mode"
          :item="item"
          @on-input-cancel="handleInputCancel"
          @on-input-save="handleInputSave"
          @on-input-back="handleInputBack"
        ></product-input>
      </v-window-item>
    </v-window>

    <datatable-delete-dialog
      :show="showDialog"
      :title="$t('industry.delete')"
      @on-delete-cancel="handleDeleteCancel"
      @on-delete-confirm="handleDeleteConfirm"
    ></datatable-delete-dialog>
  </v-card>
</template>

<script lang="ts">
import api from "@/api/crud";
import { defaultFooterProps, mapOptions, sortParams, setSortOptions } from "@/utils/datatable";
import { DataOptions } from "vuetify";
import { Product } from "@/interfaces/product";

import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "Product",

  components: {
    ProductInput: () => import("./product-input.vue"),
    DatatableActionSlot: () => import("@/views/widget/datatable-action-slot.vue"),
    DatatableTopSlot: () => import("@/views/widget/datatable-top-slot.vue"),
    DatatableDeleteDialog: () => import("@/views/widget/datatable-delete-dialog.vue"),
    DatatableIsoDate: () => import("@/views/widget/datatable-iso-date.vue"),
    DatatableTitle: () => import("@/views/widget/datatable-title.vue")
  },

  setup(_, { root }) {
    // datatable header
    const headers = ref([
      { text: "Id", align: "start", sortable: false, value: "productId" },
      { text: "Name", value: "productLocalized" },
      { text: "Points", value: "points" },
      { text: "Industry Id", value: "industryId" },
      // { text: "Flag Status", value: "statusFlag" },
      { text: "Created", value: "createdTimestamp" },
      { text: null, value: "actions", sortable: false, align: "right" }
    ]);

    // datatable options
    const options = ref({ sortBy: ["productId"], sortDesc: [], itemsPerPage: 10 } as DataOptions);

    // Other datatable settings
    const filter = ref("");
    const loading = ref(false);
    const item = ref<Product>({} as Product);
    const items = ref([]);
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

        api.get("Product/Datatable", dtOptions).then(({ data }) => {
          items.value = data.data || [];
          serverItemsLength.value = data.total;
          loading.value = false;
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

    function handleDelete(val) {
      item.value = val;
      showDialog.value = true;
    }

    function handleDeleteCancel() {
      showDialog.value = false;
    }

    async function handleDeleteConfirm() {
      await api.delete(`/Product/${item.value.productId}`);
      showDialog.value = false;
      refreshData();
    }

    function handleInputBack() {
      window.value = 0;
    }

    function handleInputCancel() {
      window.value = 0;
    }

    function handleInsert() {
      mode.value = "insert";
      item.value = {} as Product;
      window.value = 1;
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

    function handleEdit(val) {
      mode.value = "edit";
      item.value = val;
      window.value = 1;
    }
    function fn2(val) {
      const locale = root.$i18n.locale;
      return val != null ? val[locale] : "";
    }
    return {
      defaultFooterProps,
      filter,
      headers,
      loading,
      item,
      items,
      mode,
      fn2,
      options,
      serverItemsLength,
      showDialog,
      window,
      handleDelete,
      handleDeleteCancel,
      handleDeleteConfirm,
      handleEdit,
      handleInputBack,
      handleInputCancel,
      handleInputSave,
      handleInsert,
      handleRefresh,
      handleSearch,
      handleUpdateOptions
    };
  }
});
</script>
