<template>
  <v-card height="calc(100vh - 50px)" class="pa-4" elevation="0">
    <v-alert border="bottom" dense class="pa-4 ma-0 primary rounded-b-0"
      ><p class="ma-0 gold--text text-center text-uppercase">ORDERS IN PROCESS</p>
    </v-alert>

    <v-data-table
      class="elevation-0 mt-5"
      :headers="headers"
      :items="items"
      :items-per-page="options.itemsPerPage"
      :loading="loading"
      :options.sync="options"
      :server-items-length="serverItemsLength"
      :footer-props="defaultFooterProps"
      @update:options="handleUpdateOptions"
      item-key="id"
      show-expand
      single-expand
      :expanded.sync="expanded"
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

      <template v-slot:expanded-item="{ headers }">
        <td :colspan="headers.length" class="orange lighten-5 pa-0">
          <expanded-data-table></expanded-data-table>
        </td>
      </template>

      <!-- <template v-slot:item.DateTimeCreated="{ item }">
        <format-date :dateStr="item.DateTimeCreated"></format-date>
      </template> -->
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, onActivated } from "@vue/composition-api";
import IndustryApi from "./api";
import { mapOptions } from "@/utils/datatable";

export default defineComponent({
  name: "Orders",

  components: {
    // DatatableActionSlot: () => import("@/views/widget/datatable-action-slot.vue"),
    DatatableTopSlot: () => import("@/views/widget/datatable-top-slot.vue"),
    IndustryInput: () => import("./industry-input.vue"),
    ExpandedDataTable: () => import("./expanded-data-table.vue")
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
      const dtOptions = mapOptions(options.value);
      dtOptions["filter"] = search.value;
      IndustryApi.datatable(dtOptions).then(({ data }) => {
        industries.value = data.data || [];
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
      fetchIndustries();
    }

    function onAdd() {
      this.editedIndex = -1;
      this.dialog = true;
      this.dialogTitle = "Add new";
    }

    async function onDelete(item) {
      await IndustryApi.delete(item.industryId);
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
      loading.value = true;
      if (this.editedIndex > -1) {
        IndustryApi.update(this.editedItem.industryId, this.editedItem).then(({ data }) => {
          Object.assign(this.industries[this.editedIndex], data);
          loading.value = false;
        });
      } else {
        IndustryApi.create(this.editedItem).then(({ data }) => {
          this.industries.push(data);
          loading.value = false;
        });
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
      loading,
      options,
      fetchIndustries
    };
  }
});
</script>
