<template>
  <v-card height="calc(100vh - 50px)" class="pa-4" elevation="0">
    <v-alert border="bottom" dense class="pa-4 ma-0 primary rounded-b-0"
      ><p class="ma-0 gold--text text-center text-uppercase">INDUSTRIES</p>
    </v-alert>

    <v-data-table
      :loading="loading"
      :search="search"
      :headers="headers"
      :server-items-length="industriesTotLenght"
      :options.sync="options"
      @update:options="fetchIndustries"
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
import { defineComponent, ref, onActivated, nextTick } from "@vue/composition-api";
import IndustryApi from "./api";
import { mapOptions } from "@/utils/datatable";

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
    const options = ref({});
    const dialogTitle = ref("");
    const loading = ref(false);
    const search = ref("");
    const industries = ref([]);
    const industriesTotLenght = ref(0);
    const dialog = ref(false);
    const editedIndex = ref(-1);
    const editedItem = ref({
      industryName: "",
      industryId: "",
      description: "",
      status: 0
    });
    const defaultItem = ref({
      industryName: "",
      industryId: "",
      description: "",
      status: 0
    });

    function fetchIndustries() {
      loading.value = true;
      const dtOptions = mapOptions(options.value);
      dtOptions["filter"] = search.value;
      IndustryApi.datatable(dtOptions).then(({ data }) => {
        industries.value = data.data || [];
        industriesTotLenght.value = data.total;
        loading.value = false;
      });
    }

    onActivated(() => {
      fetchIndustries();
    });

    function onCancelInput() {
      close();
    }

    function onUpdate(item) {
      editedIndex.value = industries.value.indexOf(item);
      editedItem.value = Object.assign({}, item);
      dialog.value = true;
      dialogTitle.value = "Edit Industry";
    }

    function onSearch(value) {
      search.value = value;
      fetchIndustries();
    }

    function onAdd() {
      editedIndex.value = -1;
      dialog.value = true;
      dialogTitle.value = "Add new";
    }

    async function onDelete(item) {
      await IndustryApi.delete(item.industryId);
      industries.value.splice(industries.value.indexOf(item), 1);
    }

    function close() {
      dialog.value = false;
      nextTick(() => {
        editedItem.value = Object.assign({}, defaultItem.value);
        editedIndex.value = -1;
      });
    }

    function onSaveInput() {
      loading.value = true;
      if (editedIndex.value > -1) {
        IndustryApi.update(editedItem.value.industryId, editedItem.value).then(({ data }) => {
          Object.assign(industries.value[editedIndex.value], data);
          loading.value = false;
        });
      } else {
        IndustryApi.create(editedItem.value).then(({ data }) => {
          industries.value.push(data);
          loading.value = false;
        });
      }
      close();
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
      loading,
      options,
      fetchIndustries,
      industriesTotLenght
    };
  }
});
</script>
