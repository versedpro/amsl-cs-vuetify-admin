<template>
  <v-card flat tile height="calc(100vh - 50px)" class="pa-4" elevation="0">
    <v-window v-model="window" class="elevation-1" vertical>
      <v-window-item>
        <v-card-title class="primary justify-center gold--text"
          >{{ $t("supplier_products.title") }}
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
        >
          <!-- top slot -->
          <template v-slot:top>
            <datatable-top-slot @on-search="handleSearch" @on-insert="handleInsert" />
          </template>

          <!-- actions slot -->
          <template v-slot:[`item.actions`]="{ item }">
            <datatable-action-slot @on-update="handleEdit(item)" @on-delete="handleDelete(item)">
            </datatable-action-slot>
          </template>

          <!-- createdTimestamp slot -->
          <template v-slot:[`item.createdTimestamp`]="{ value }">
            <datatable-iso-date :timestamp="value"> </datatable-iso-date>
          </template>
        </v-data-table>
      </v-window-item>

      <v-window-item>
        <supplier-product-input
          :mode="mode"
          :item="item"
          @on-input-cancel="handleInputCancel"
          @on-input-save="handleInputSave"
          @on-input-back="handleInputBack"
        ></supplier-product-input>
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
import { SupplierProduct } from "@/interfaces/supplier-product";
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "SupplierProduct",

  components: {
    SupplierProductInput: () => import("./supplier-product-input.vue"),
    DatatableActionSlot: () => import("@/views/widget/datatable-action-slot.vue"),
    DatatableTopSlot: () => import("@/views/widget/datatable-top-slot.vue"),
    DatatableDeleteDialog: () => import("@/views/widget/datatable-delete-dialog.vue"),
    DatatableIsoDate: () => import("@/views/widget/datatable-iso-date.vue")
  },

  setup() {
    const headers = ref([
      { text: "Id", align: "start", sortable: false, value: "supplierProductId" },
      { text: "SupplierId", sortable: false, value: "supplierId" },
      { text: "ProductId", sortable: false, value: "productId" },
      { text: "Created", value: "createdTimestamp" },
      { text: null, value: "actions", sortable: false, align: "right" }
    ]);

    // datatable options
    const options = ref({
      sortBy: ["supplierProductId"],
      sortDesc: [],
      itemsPerPage: 10
    } as DataOptions);

    // Other datatable settings
    const filter = ref("");
    const loading = ref(false);
    const item = ref<SupplierProduct>({} as SupplierProduct);
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

        api.get("/SupplierProduct/Datatable", dtOptions).then(({ data }) => {
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

    function handleDelete(val) {
      item.value = val;
      showDialog.value = true;
    }

    function handleDeleteCancel() {
      showDialog.value = false;
    }

    async function handleDeleteConfirm() {
      await api.delete(`/SupplierProduct/${item.value.supplierProductId}`);
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
      item.value = {} as SupplierProduct;
      window.value = 1;
    }

    function handleInputSave() {
      handleInputBack();
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

    return {
      defaultFooterProps,
      filter,
      headers,
      loading,
      item,
      items,
      mode,
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
      handleSearch,
      handleUpdateOptions
    };
  }
});
</script>
