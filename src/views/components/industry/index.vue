<template>
  <v-card class="red">
    <v-card-title> Industries</v-card-title>

    <v-data-table
      :search="search"
      :headers="headers"
      :items="industries"
      :items-per-page="5"
      class="elevation-1"
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
import { Headers, Industries } from "@/demo/api/mock_industry_list";
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "Industry",

  components: {
    DatatableActionSlot: () => import("@/views/widget/datatable-action-slot.vue"),
    DatatableTopSlot: () => import("@/views/widget/datatable-top-slot.vue"),
    IndustryInput: () => import("./industry-input.vue")
  },

  setup() {
    const headers = ref(Headers);
    const dialogTitle = ref("");
    const search = ref("");
    const industries = ref(Industries);
    const dialog = false;
    const editedIndex = -1;
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

    function onCancelInput() {
      this.close();
    }

    function onUpdate(item) {
      this.editedIndex = this.industries.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.dialogTitle = "Edit Industry";
    }

    function onSearch(value) {
      this.search = value;
    }

    function onAdd() {
      this.editedIndex = -1;
      this.dialog = true;
      this.dialogTitle = "Add new";
    }

    function onDelete(item) {
      this.industries.splice(this.industries.indexOf(item), 1);
    }

    function close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    }

    function onSaveInput() {
      if (this.editedIndex > -1) {
        Object.assign(this.industries[this.editedIndex], this.editedItem);
      } else {
        this.industries.push(this.editedItem);
      }
      this.close();
    }

    return {
      headers,
      search,
      industries,
      onSaveInput,
      onDelete,
      close,
      onCancelInput,
      onUpdate,
      dialogTitle,
      defaultItem,
      dialog,
      editedIndex,
      editedItem,
      onAdd,
      onSearch
    };
  }
});
</script>
