<template>
  <v-card height="calc(100vh - 50px)" class="pa-4" elevation="0">
    <v-alert border="bottom" dense class="pa-4 ma-0 primary rounded-b-0"
      ><p class="ma-0 gold--text text-center text-uppercase">INDUSTRIES</p>
    </v-alert>

    <v-data-table
      :loading="loading"
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
          class="gold--text"
        ></datatable-action-slot>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Headers, Industries } from "@/demo/api/mock_industry_list";
import { defineComponent, ref, onActivated } from "@vue/composition-api";
import IndustryApi from "./api";

export default defineComponent({
  name: "Industry",

  components: {
    DatatableActionSlot: () => import("@/views/widget/datatable-action-slot.vue"),
    DatatableTopSlot: () => import("@/views/widget/datatable-top-slot.vue"),
    IndustryInput: () => import("./industry-input.vue")
  },

  setup() {
    const headers = ref([
      { text: "Id", align: "start", sortable: false, value: "industryId" },
      { text: "Name", value: "industryName" },
      { text: "Description", value: "description" },
      { text: null, value: "actions", sortable: false, align: "right" }
    ]);
    const dialogTitle = ref("");
    const loading = ref(false);
    const search = ref("");
    const industries = ref([]);
    const dialog = false;
    const editedIndex = -1;
    const editedItem = {
      industryName: "",
      industryId: "",
      description: "",
      status: 0
    };
    const defaultItem = {
      industryName: "",
      industryId: "",
      description: "",
      status: 0
    };

    function fetchIndustries() {
      loading.value = true;
      IndustryApi.list().then(({ data }) => {
        industries.value = data;
        loading.value = false;
      });
    }

    onActivated(() => {
      fetchIndustries();
    });

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
        IndustryApi.create(this.editedItem).then(({ data }) => this.industries.push(data));
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
      onSearch,
      loading
    };
  }
});
</script>
