<template>
  <v-card flat tile height="calc(100vh - 50px)" class="pa-4" elevation="0">
    <v-window v-model="window" class="elevation-1" vertical>
      <v-window-item>
        <v-card-title class="primary justify-center gold--text"
          >{{ $t("supplier_products.title") }}
        </v-card-title>

        <v-data-table
          :loading="loading"
          :search="search"
          :server-items-length="totalProducts"
          :options.sync="options"
          @update:options="fetchProducts"
          :headers="headers"
          :items="products"
          :items-per-page="5"
          class="elevation-1"
        >
          <!-- Top Slot -->
          <template v-slot:top>
            <datatable-top-slot
               @on-search="onSearch($event)"
              @on-insert="onAdd"
            ></datatable-top-slot>
            <delete-product
              :show="dialogDelete"
              :itemID="itemIdToDelete"
              @on-delete="(id) => onDeleteItem(id)"
              @on-cancel-delete="onCancelDelete"
            ></delete-product>
          </template>

          <!-- Action Slot -->
          <template v-slot:[`item.actions`]="{ item }">
            <datatable-action-slot
              @on-update="onUpdate(item)"
              @on-delete="onDelete(item.productId)"
              class="gold--text"
            >
            </datatable-action-slot>
          </template>
        </v-data-table>
      </v-window-item>
      <v-window-item>
        <product-input
          :mode="mode"
          :item="item"
          @on-cancel-input="onCancelInput"
          @on-save-input="handleSaveInput"
          @on-back-button="handleBackButton"
        ></product-input>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, onActivated } from "@vue/composition-api";
import ProductApi from "./api";
import { mapOptions } from "@/utils/datatable";
// import DeleteProduct from "./delete-product.vue";
// import ProductInput from "../products/product-input.vue";

export default defineComponent({
  name: "Product",

  components: {
    ProductInput: () => import("./product-input.vue"),
    DatatableActionSlot: () => import("@/views/widget/datatable-action-slot.vue"),
    DatatableTopSlot: () => import("@/views/widget/datatable-top-slot.vue"),
    DeleteProduct: () => import("./delete-product.vue")
  },

  setup(_, { root: { $nextTick } }) {
    const headers = ref([
      { text: "Id", align: "start", sortable: false, value: "supplierProductId" },
      { text: "SupplierId", sortable: false, value: "supplierId" },
      { text: "ProductId", sortable: false, value: "productId" },
      { text: "Created", value: "createdTimestamp" },
      { text: null, value: "actions", sortable: false, align: "right" }
    ]);

    const options = ref({});
    const mode = ref("insert");
    const item = ref({});
    const totalProducts = ref(0);
    const loading = ref(false);
    const search = ref("");
    const itemsPerPage = ref(4);
    const products = ref([]);
    const dialog = ref(false);
    const dialogDelete = ref(false);
    const editedIndex = ref(-1);
    const itemIdToDelete = ref(0);
    const editedItem = ref({
      productName: "",
      productId: ""
    });
    const defaultItem = ref({
      productName: "",
      productId: ""
    });
    const dialogTitle = ref("");

    const window = ref(0);
    function onAdd() {
      mode.value = "insert";
      item.value = {};
      window.value = 1;
    }
    function onBackButton() {
      window.value = 0;
    }
    function fetchProducts() {
      loading.value = true;
      const dtOptions = mapOptions(options.value);
      dtOptions["filter"] = search.value;
      ProductApi.datatable(dtOptions).then(({ data }) => {
        products.value = data.data || [];
        totalProducts.value = data.total;
        loading.value = false;
      });
    }

    onActivated(() => {
      fetchProducts();
    });

    function onUpdate(val) {
       mode.value = "edit"; 
      item.value = val;
      window.value = 1;
    }

    function onDeleteItem(id) {
      ProductApi.delete(id).then(() => {
        products.value.splice(
          products.value.findIndex((x) => x.productId == id),
          1
        );
        totalProducts.value--;
        dialogDelete.value = false;
      });
    }

    function onDelete(id) {
      itemIdToDelete.value = id;
      dialogDelete.value = true;
    }

    function onSearch(value) {
      search.value = value;
      fetchProducts();
    }

    function onCancelDelete() {
      itemIdToDelete.value = 0;
      dialogDelete.value = false;
    }

    function close() {
      dialog.value = false;
      $nextTick(() => {
        editedItem.value = Object.assign({}, defaultItem.value);
        editedIndex.value = -1;
      });
    }

    function onSaveInput() {
      dialog.value = false;
      if (editedIndex.value > -1) {
        ProductApi.update(editedItem.value.productId, editedItem.value).then(({ data }) => {
          fetchProducts();
        });
      } else {
        ProductApi.create(editedItem.value).then(({ data }) => {
          products.value.push(data);
          totalProducts.value--;
        });
      }

      close();
    }

    function handleBackButton() {
      window.value = 0;
    }

    function onCancelInput() {
      window.value = 0;
    }

    return {
      itemsPerPage,
      onAdd,
      mode,
      item,
      dialog,
      dialogDelete,
      editedItem,
      itemIdToDelete,
      dialogTitle,
      loading,
      onDelete,
      onUpdate,
      onSearch,
      search,
      products,
      fetchProducts,
      totalProducts,
      headers,
      options,
      onCancelInput,
      onSaveInput,
      onCancelDelete,
      onDeleteItem,
      onBackButton,
      window,
      handleBackButton
    };
  }
});
</script>
