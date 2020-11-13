<template>
  <v-card class="red">
    <v-card-title> Industries</v-card-title>

    <v-data-table :headers="headers" :items="industries" :items-per-page="5" class="elevation-1">
      <!-- Top Slot -->
      <template v-slot:top>
        <datatable-top-slot></datatable-top-slot>

        <supplier-input
          :show="showDialog"
          :item="editedItem"
          :title="dialogTitle"
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
import { defineComponent, ref } from "@vue/composition-api";
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
    const industries = ref(Industries);

    const editedIndex = -1;
    const deletedIndex = -1;
    const editedItem = {
      name: "",
      id: "",
      title: ""
    };
    const defaultItem = {
      name: "",
      id: "",
      title: ""
    };

    const showDialog = ref(false);

    const headers = ref([
      {
        text: "Id",
        align: "start",
        sortable: false,
        value: "id"
      },
      { text: "Name", value: "name" },
      { text: "Title", value: "title" },
      { text: null, value: "actions", sortable: false, align: "right" }
    ]);

    function onUpdate(item) {
      console.log(item.name);
      this.editedIndex = this.industries.indexOf(item);
      this.editedItem = Object.assign({}, item);
      showDialog.value = true;
      this.dialogTitle = "Edit Industry";
    }

    function onDelete(item) {
      console.log(item.title);
    }

    function onCancelInput() {
      showDialog.value = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    }

    function onSaveInput() {
      showDialog.value = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      // if (this.editedIndex > -1) {
      //   Object.assign(this.industries[this.editedIndex], this.editedItem);
      // } else {
      //   this.industries.push(this.editedItem);
      // }
      // this.close();
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
      showDialog,
      editedIndex,
      editedItem,
      addItem,
      deletedIndex,
      defaultItem
    };
  }
});
</script>
