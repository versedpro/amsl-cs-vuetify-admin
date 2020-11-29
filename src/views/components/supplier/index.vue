<template>
  <v-card class="red">
    <v-card-title>Suppliers</v-card-title>

    <v-window v-model="window">
      <v-window-item>
        <v-data-table
          class="elevation-1"
          :headers="headers"
          :items="industries"
          :loading="loading"
          :server-items-length="serverItemsLength"
          @update:options="handleUpdateOptions"
        >
          <!-- Top Slot -->
          <template v-slot:top>
            <datatable-top-slot @on-item-add="addItem()"></datatable-top-slot>

            <supplier-input
              :show="dialog"
              :item="editedItem"
              :title="dialogTitle"
              @on-item-changed="
                (key, value) => {
                  editedItem[key] = value;
                }
              "
              @on-cancel-input="onCancelInput"
              @on-save-input="onSaveInput"
            ></supplier-input>
          </template>

          <!-- Action Slot -->
          <template v-slot:[`item.actions`]="{ item }">
            <datatable-action-slot
              @on-update="onUpdate(item)"
              @on-delete="onDelete(item)"
            ></datatable-action-slot>
          </template>
        </v-data-table>
      </v-window-item>

      <v-window-item>
        <v-card-text> hello </v-card-text>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script lang="ts">
import SupplierApi from "./api";
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "Supplier",

  components: {
    DatatableActionSlot: () => import("@/views/widget/datatable-action-slot.vue"),
    DatatableTopSlot: () => import("@/views/widget/datatable-top-slot.vue"),
    SupplierInput: () => import("./supplier-input.vue")
  },

  setup() {
    const industries = ref([]);
    const serverItemsLength = ref(0);
    const dialogTitle = ref("");
    const loading = ref(false);
    const dialog = ref(false);
    const editedIndex = ref(-1);
    const deletedIndex = ref(-1);
    const window = ref(0);
    const editedItem = {
      supplierName: "",
      supplierId: "",
      title: ""
    };
    const defaultItem = {
      supplierName: "",
      supplierId: "",
      title: ""
    };

    const headers = ref([
      {
        text: "Id",
        align: "start",
        sortable: false,
        value: "industryId"
      },
      { text: "Name", value: "industryName" },
      { text: null, value: "actions", sortable: false, align: "right" }
    ]);

    function fetchIndustries(page, itemsPerPage) {
      loading.value = true;
      SupplierApi.datatable("", page, itemsPerPage, "").then((response) => {
        industries.value = response["data"]["data"];
        serverItemsLength.value = response["data"]["total"];
      });
      loading.value = false;
    }

    function onUpdate(item) {
      editedIndex.value = industries.value.indexOf(item);
      this.editedItem = Object.assign({}, item);
      dialog.value = true;
      this.dialogTitle = "Edit Supplier";
    }

    function onDelete(item) {
      const index = this.industries.indexOf(item);
      this.industries.splice(index, 1);
      SupplierApi.delete(item.supplierId);
    }

    function onCancelInput() {
      dialog.value = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    }

    function onSaveInput() {
      dialog.value = false;
      loading.value = true;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      if (this.editedIndex > -1) {
        Object.assign(this.industries[this.editedIndex], this.editedItem);
        SupplierApi.update(this.editedItem.supplierId, this.editedItem).then(({ data }) => {
          Object.assign(this.industries[this.editedIndex], data);
          loading.value = false;
        });
      } else {
        SupplierApi.create(this.editedItem).then(({ data }) => {
          this.industries.push(data);
          loading.value = false;
        });
      }
    }

    function addItem() {
      window.value = 1;
      // this.editedIndex = -1;
      // this.dialog = true;
      // this.dialogTitle = "Add new";
    }

    function handleUpdateOptions(opt) {
      const { page, itemsPerPage } = opt;
      fetchIndustries(page, itemsPerPage);
    }

    return {
      industries,
      serverItemsLength,
      headers,
      onUpdate,
      onDelete,
      onCancelInput,
      onSaveInput,
      dialog,
      editedIndex,
      editedItem,
      addItem,
      deletedIndex,
      defaultItem,
      dialogTitle,
      loading,
      handleUpdateOptions,
      fetchIndustries,
      window
    };
  }
});
</script>
