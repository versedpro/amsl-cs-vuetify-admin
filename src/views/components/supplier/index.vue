<template>
  <v-card height="calc(100vh - 50px)" class="pa-4" elevation="0">
    <v-window v-model="window" class="elevation-1" vertical>
      <v-window-item>
        <v-card-title class="primary justify-center gold--text"
          >{{ $t("supplier.title") }}
        </v-card-title>

        <v-data-table
          :loading="loading"
          :search="search"
          :server-items-length="totalSuppliers"
          :options.sync="options"
          @update:options="fetchSupplier"
          :headers="headers"
          :items="suppliers"
          :items-per-page="5"
          class="elevation-1"
        >
          <!-- Top Slot -->
          <template v-slot:top>
            <datatable-top-slot
              @on-search="onSearch($event)"
              @on-insert="onAdd"
            ></datatable-top-slot>
          </template>

          <!-- Action Slot -->
          <template v-slot:[`item.actions`]="{ item }">
            <datatable-action-slot
              @on-update="onUpdate(item)"
              @on-delete="onDelete(item.supplierId)"
              class="gold--text"
            >
            </datatable-action-slot>
          </template>
        </v-data-table>
      </v-window-item>
      <v-window-item>
        <supplier-input
          :mode="mode"
          :item="item"
          @on-cancel-input="onCancelInput"
          @on-save-input="handleSaveInput"
          @on-back-button="handleBackButton"
        ></supplier-input>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, onActivated } from "@vue/composition-api";
import SupplierApi from "./api";
import { mapOptions } from "@/utils/datatable";
import DeleteSupplier from "./delete-supplier.vue";

export default defineComponent({
  name: "Product",

  components: {
    SupplierInput: () => import("./supplier-input.vue"),
    DatatableActionSlot: () => import("@/views/widget/datatable-action-slot.vue"),
    DatatableTopSlot: () => import("@/views/widget/datatable-top-slot.vue"),
    // DeleteSupplier: () => import("./delete-supplier.vue")
  },

  setup(_, { root: { $nextTick } }) {
    const headers = ref([
      { text: "Id", align: "start", sortable: false, value: "supplierId" },
      { text: "Name", value: "supplierName" },
      { text: "Created", value: "createdTimestamp" },
      { text: null, value: "actions", sortable: false, align: "right" }
    ]);

    const options = ref({});
    const mode = ref("insert");
    const item = ref({});
    const totalSuppliers = ref(0);
    const loading = ref(false);
    const search = ref("");
    const itemsPerPage = ref(4);
    const suppliers = ref([]);
    const dialog = ref(false);
    const dialogDelete = ref(false);
    const editedIndex = ref(-1);
    const itemIdToDelete = ref(0);
    const editedItem = ref({
      supplierName: "",
      supplierId: ""
    });
    const defaultItem = ref({
      supplierName: "",
      supplierId: ""
    });
    const dialogTitle = ref("");

    const window = ref(0);

    function onAdd() {
      mode.value = "insert";
      item.value = {};
      window.value = 1;
    }

    function fetchSupplier() {
      loading.value = true;
      const dtOptions = mapOptions(options.value);
      dtOptions["filter"] = search.value;
      SupplierApi.datatable(dtOptions).then(({ data }) => {
        suppliers.value = data.data || [];
        totalSuppliers.value = data.total;
        loading.value = false;
      });
    }

    onActivated(() => {
      fetchSupplier();
    });

    // function onUpdate(item) {
    //   editedIndex.value = suppliers.value.indexOf(item);
    //   editedItem.value = Object.assign({}, item);
    //   dialog.value = true;
    //   dialogTitle.value = "Edit Product";
    // }
    function onUpdate(val) {
      mode.value = "edit"; 
      item.value = val;
      window.value = 1;
    }

    function onDeleteItem(id) {
      SupplierApi.delete(id).then(() => {
        suppliers.value.splice(
          suppliers.value.findIndex((x) => x.supplierId == id),
          1
        );
        totalSuppliers.value--;
        dialogDelete.value = false;
      });
    }

    function onDelete(id) {
      itemIdToDelete.value = id;
      dialogDelete.value = true;
    }

    function onSearch(value) {
      search.value = value;
      fetchSupplier();
    }

    function handleSaveInput(mode) {
      console.log(mode);
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
        SupplierApi.update(editedItem.value.supplierId, editedItem.value).then(({ data }) => {
          fetchSupplier();
        });
      } else {
        SupplierApi.create(editedItem.value).then(({ data }) => {
          suppliers.value.push(data);
          totalSuppliers.value--;
        });
      }

      close();
    }
    function onBackButton() {
      window.value = 0;
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
      suppliers,
      fetchSupplier,
      totalSuppliers,
      headers,
      options,
      onCancelInput,
      onSaveInput,
      onCancelDelete,
      onDeleteItem,
      onBackButton,
      handleBackButton,
      handleSaveInput,
      window
    };
  }
});
</script>
