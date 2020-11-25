<template>
  <v-card class="red">
    <v-card-title>Suppliers</v-card-title>

    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="industries"
      :items-per-page="5"
      class="elevation-1"
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
  </v-card>
</template>

<script lang="ts">
import { defineComponent, onActivated, ref } from "@vue/composition-api";
import axios from "axios";
import SupplierApi from "./api";
import { Industries } from "@/demo/api/mock_industry_list";

export default defineComponent({
  name: "Supplier",

  components: {
    DatatableActionSlot: () => import("@/views/widget/datatable-action-slot.vue"),
    DatatableTopSlot: () => import("@/views/widget/datatable-top-slot.vue"),
    SupplierInput: () => import("./supplier-input.vue")
  },

  setup() {
    const itemsPerPage = ref(4);
    const industries = ref([]);
    const dialogTitle = ref("");
    const loading = ref(false);
    const dialog = ref(false);
    const editedIndex = -1;
    const deletedIndex = -1;
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
        value: "supplierId"
      },
      { text: "Name", value: "supplierName" },
      { text: null, value: "actions", sortable: false, align: "right" }
    ]);

    function fetchIndustries() {
      loading.value = true;
      SupplierApi.list().then(({ data }) => {
        industries.value = data;
        loading.value = false;
      });
    }

    onActivated(() => {
      fetchIndustries();
    });

    function onUpdate(item) {
      this.editedIndex = this.industries.indexOf(item);
      this.editedItem = Object.assign({}, item);
      dialog.value = true;
      this.dialogTitle = "Edit Supplier";
    }

    function onDelete(item) {
      const index = this.industries.indexOf(item);
      this.industries.splice(index, 1);
      SupplierApi.delete(index);
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
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      if (this.editedIndex > -1) {
        Object.assign(this.industries[this.editedIndex], this.editedItem);
        SupplierApi.update(this.editedIndex, this.editedItem);
      } else {
        SupplierApi.create(this.editedItem).then(({ data }) => this.industries.push(data));
      }
    }

    function addItem() {
      this.editedIndex = -1;
      this.dialog = true;
      this.dialogTitle = "Add new";
    }

    return {
      itemsPerPage,
      industries,
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
      loading
    };
  }
});
</script>
