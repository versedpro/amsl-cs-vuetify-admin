<template>
  <v-card height="calc(100vh - 50px)" class="pa-4" elevation="0">
    <v-alert border="bottom" dense class="pa-4 ma-0 primary rounded-b-0">
      <p class="ma-0 gold--text text-center text-uppercase">PRODUCTS</p>
    </v-alert>

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
          @on-item-add="onAdd()"
        ></datatable-top-slot>
        <product-input
          :show="dialog"
          :item="editedItem"
          :title="dialogTitle"
          @on-item-changed="(key, value) => (editedItem[key] = value)"
          @on-cancel-input="onCancelInput"
          @on-save-input="onSaveInput"
        ></product-input>
      </template>

      <!-- Action Slot -->
      <template v-slot:[`item.actions`]="{ item }">
        <datatable-action-slot
          @on-update="onUpdate(item)"
          @on-delete="onDelete(item)"
          class="gold--text"
        ></datatable-action-slot>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, onActivated } from "@vue/composition-api";
import ProductApi from "./api";
import { mapOptions } from "@/utils/datatable";

export default defineComponent({
  name: "Product",

  components: {
    ProductInput: () => import("./product-input.vue"),
    DatatableActionSlot: () => import("@/views/widget/datatable-action-slot.vue"),
    DatatableTopSlot: () => import("@/views/widget/datatable-top-slot.vue")
  },

  setup(_, { root: { $nextTick } }) {
    const headers = ref([
      { text: "Id", align: "start", sortable: false, value: "productId" },
      { text: "Name", value: "productName" },
      { text: "Created", value: "createdTimestamp" },
      { text: null, value: "actions", sortable: false, align: "right" }
    ]);

    const options = ref({});
    const totalProducts = ref(0);
    const loading = ref(false);
    const search = ref("");
    const itemsPerPage = ref(4);
    const products = ref([]);
    const dialog = ref(false);
    const editedIndex = ref(-1);
    const editedItem = ref({
      productName: "",
      productId: ""
    });
    const defaultItem = ref({
      productName: "",
      productId: ""
    });
    const dialogTitle = ref("");

    function onAdd() {
      dialogTitle.value = "Add new";
      dialog.value = true;
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

    function onUpdate(item) {
      editedIndex.value = products.value.indexOf(item);
      editedItem.value = Object.assign({}, item);
      dialog.value = true;
      dialogTitle.value = "Edit Industry";
    }

    async function onDelete(item) {
      await ProductApi.delete(item.productId);
      products.value.splice(products.value.indexOf(item), 1);
      totalProducts.value--;
    }

    function onSearch(value) {
      search.value = value;
      fetchProducts();
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
          Object.assign(products.value[editedIndex.value], data);
        });
      } else {
        ProductApi.create(editedItem.value).then(({ data }) => {
          products.value.push(data);
          totalProducts.value--;
        });
      }

      close();
    }

    function onCancelInput() {
      close();
    }

    return {
      itemsPerPage,
      onAdd,
      dialog,
      editedItem,
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
      onSaveInput
    };
  }
});
</script>
