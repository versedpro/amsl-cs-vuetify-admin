<template>
  <v-card height="calc(100vh - 50px)" class="pa-4" elevation="0">
    <v-alert border="bottom" dense class="pa-4 ma-0 primary rounded-b-0">
      <p class="ma-0 gold--text text-center text-uppercase">INDUSTRIES</p>
    </v-alert>

    <v-data-table
      :loading="loading"
      :search="search"
      :server-items-length="totalIndustries"
      :options.sync="options"
      @update:options="fetchIndustries"
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
        <delete-industry
          :show="dialogDelete"
          :itemID="itemIdToDelete"
          @on-delete="(id) => onDeleteItem(id)"
          @on-cancel-delete="onCancelDelete"
        ></delete-industry>
      </template>

      <!-- Action Slot -->
      <template v-slot:[`item.actions`]="{ item }">
        <datatable-action-slot
          @on-update="onUpdate(item)"
          @on-delete="onDelete(item.industryId)"
          class="gold--text"
        >
        </datatable-action-slot>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, onActivated } from "@vue/composition-api";
import IndustryApi from "./api";
import { mapOptions } from "@/utils/datatable";
import DeleteIndustry from "./delete-industry.vue";

export default defineComponent({
  name: "Industry",

  components: {
    IndustryInput: () => import("./industry-input.vue"),
    DatatableActionSlot: () => import("@/views/widget/datatable-action-slot.vue"),
    DatatableTopSlot: () => import("@/views/widget/datatable-top-slot.vue"),
    DeleteIndustry: () => import("./delete-industry.vue")
  },

  setup(_, { root: { $nextTick } }) {
    const headers = ref([
      { text: "Id", align: "start", sortable: false, value: "industryId" },
      { text: "Name", value: "industryName" },
      { text: "Created", value: "createdTimestamp" },
      { text: null, value: "actions", sortable: false, align: "right" }
    ]);

    const options = ref({});
    const totalIndustries = ref(0);
    const loading = ref(false);
    const search = ref("");
    const itemsPerPage = ref(4);
    const industries = ref([]);
    const dialog = ref(false);
    const dialogDelete = ref(false);
    const editedIndex = ref(-1);
    const itemIdToDelete = ref(0);
    const editedItem = ref({
      industryName: "",
      industryId: ""
    });
    const defaultItem = ref({
      industryName: "",
      industryId: ""
    });
    const dialogTitle = ref("");

    function onAdd() {
      dialogTitle.value = "Add new";
      dialog.value = true;
    }

    function fetchIndustries() {
      loading.value = true;
      const dtOptions = mapOptions(options.value);
      dtOptions["filter"] = search.value;
      IndustryApi.datatable(dtOptions).then(({ data }) => {
        industries.value = data.data || [];
        totalIndustries.value = data.total;
        loading.value = false;
      });
    }

    onActivated(() => {
      fetchIndustries();
    });

    function onUpdate(item) {
      editedIndex.value = industries.value.indexOf(item);
      editedItem.value = Object.assign({}, item);
      dialog.value = true;
      dialogTitle.value = "Edit Product";
    }

    function onDeleteItem(id) {
      IndustryApi.delete(id).then(() => {
        industries.value.splice(industries.value.findIndex(x => x.productId == id), 1);
        totalIndustries.value--;
        dialogDelete.value = false;
      });
    }

    function onDelete(id) {
      itemIdToDelete.value = id;
      dialogDelete.value = true;
    }

    function onSearch(value) {
      search.value = value;
      fetchIndustries();
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
        IndustryApi.update(editedItem.value.industryId, editedItem.value).then(({ data }) => {
          fetchIndustries();
        });
      } else {
        IndustryApi.create(editedItem.value).then(({ data }) => {
          industries.value.push(data);
          totalIndustries.value--;
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
      dialogDelete,
      editedItem,
      itemIdToDelete,
      dialogTitle,
      loading,
      onDelete,
      onUpdate,
      onSearch,
      search,
      industries,
      fetchIndustries,
      totalIndustries,
      headers,
      options,
      onCancelInput,
      onSaveInput,
      onCancelDelete,
      onDeleteItem
    };
  }
});
</script>
