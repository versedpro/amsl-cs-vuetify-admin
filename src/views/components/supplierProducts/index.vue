<template>
  <v-card flat tile height="calc(100vh - 50px)" elevation="0">
    <v-window v-model="window" class="elevation-1" vertical>
      <v-window-item>
        <datatable-title :title="$t('supplier_products.title')"></datatable-title>

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
          item-key="supplierProductId"
          show-expand
          single-expand
          :expanded.sync="expanded"
        >
          <!-- top slot -->
          <template v-slot:top>
            <datatable-top-slot @on-search="handleSearch" @on-insert="handleInsert" />
          </template>

          <!-- actions slot -->
          <!-- <template v-slot:[`item.actions`]="{ item }">
            <datatable-action-slot @on-update="handleEdit(item)" @on-delete="handleDelete(item)">
            </datatable-action-slot>
          </template> -->

          <!-- createdTimestamp slot -->
          <template v-slot:[`item.createdTimestamp`]="{ value }">
            <datatable-iso-date :timestamp="value"> </datatable-iso-date>
          </template>

          <!-- expand slot -->
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length" class="pa-0">
              <file-upload
                :item="item"
                :id="item.supplierProductId"
                style="min-height: 100px"
              ></file-upload>
            </td>
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
import { computed, defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "SupplierProduct",

  components: {
    SupplierProductInput: () => import("./supplier-product-input.vue"),
    FileUpload: () => import("./supplier-product-expandable.vue"),
    // DatatableActionSlot: () => import("@/views/widget/datatable-action-slot.vue"),
    DatatableTopSlot: () => import("@/views/widget/datatable-top-slot.vue"),
    DatatableDeleteDialog: () => import("@/views/widget/datatable-delete-dialog.vue"),
    DatatableIsoDate: () => import("@/views/widget/datatable-iso-date.vue"),
    DatatableTitle: () => import("@/views/widget/datatable-title.vue")
  },

  setup(_, { root }) {
    const headers = computed(() => {
      return [
        {
          text: root.$t("supplier_products.id"),
          align: "start",
          sortable: true,
          value: "supplierProductId"
        },
        { text: root.$t("supplier_products.supplierId"), sortable: true, value: "supplierId" },
        { text: root.$t("supplier_products.productId"), sortable: true, value: "productId" },
        { text: root.$t("supplier_products.created"), value: "createdTimestamp" }
        // { text: null, value: "actions", sortable: false, align: "right" }
      ];
    });

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
    const expanded = ref([]);

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
      expanded,
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
