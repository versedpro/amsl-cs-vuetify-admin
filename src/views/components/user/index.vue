<template>
  <v-card flat tile height="calc(100vh - 50px)" elevation="0">
    <v-window v-model="window" class="elevation-1" vertical>
      <v-window-item>
        <datatable-title :title="$t('user.title')"></datatable-title>

        <v-data-table
          class="elevation-1"
          :footer-props="defaultFooterProps"
          :headers="headers"
          :items="items"
          item-key="roleCode"
          group-by="roleCode"
          :custom-group="groupBy"
          :items-per-page="options.itemsPerPage"
          :loading="loading"
          :options.sync="options"
          :server-items-length="serverItemsLength"
          @update:options="handleUpdateOptions"
        >
          <!-- Top Slot -->
          <template v-slot:top>
            <datatable-top-slot @on-search="handleSearch" @on-insert="handleInsert" />
          </template>

          <!-- Action Slot -->
          <template v-slot:[`item.actions`]="{ item }">
            <datatable-action-slot @on-update="handleEdit(item)" @on-delete="handleDelete(item)">
            </datatable-action-slot>
          </template>

          <!-- createdTimestamp slot -->
          <template v-slot:[`item.createdTimestamp`]="{ value }">
            <datatable-iso-date :timestamp="value"> </datatable-iso-date>
          </template>
        </v-data-table>
      </v-window-item>

      <v-window-item>
        <staff-input
          :mode="mode"
          :item="item"
          @on-input-cancel="handleInputCancel"
          @on-input-save="handleInputSave"
          @on-input-back="handleInputBack"
        >
        </staff-input>
      </v-window-item>
    </v-window>

    <datatable-delete-dialog
      :show="showDialog"
      :title="$t('staff.delete')"
      @on-delete-cancel="handleDeleteCancel"
      @on-delete-confirm="handleDeleteConfirm"
    ></datatable-delete-dialog>
  </v-card>
</template>

<script lang="ts">
import api from "@/api/crud";
import {
  defaultFooterProps,
  mapOptions,
  sortParams,
  setSortOptions,
  groupItems
} from "@/utils/datatable";
import { DataOptions } from "vuetify";
import { Staff } from "@/interfaces/staff";

import { computed, defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "Staff",

  components: {
    StaffInput: () => import("./staff-input.vue"),
    DatatableActionSlot: () => import("@/views/widget/datatable-action-slot.vue"),
    DatatableTopSlot: () => import("@/views/widget/datatable-top-slot.vue"),
    DatatableDeleteDialog: () => import("@/views/widget/datatable-delete-dialog.vue"),
    DatatableIsoDate: () => import("@/views/widget/datatable-iso-date.vue"),
    DatatableTitle: () => import("@/views/widget/datatable-title.vue")
  },

  setup(_, { root }) {
    // datatable header
    const headers = computed(() => {
      return [
        { text: root.$t("staff.title"), align: "start", sortable: false, value: "staffId" },
        { text: "Name", value: "staffAlias" },
        { text: "Created", value: "createdTimestamp" },
        { text: null, value: "actions", sortable: false, align: "right" }
      ];
    });

    // datatable options
    const options = ref({ sortBy: ["staffId"], sortDesc: [], itemsPerPage: 10 } as DataOptions);

    // Other datatable settings
    const filter = ref("");
    const loading = ref(false);
    const item = ref<Staff>({} as Staff);
    const items = ref([]);
    const serverItemsLength = ref(0);
    const mode = ref("insert");
    const showDialog = ref(false);
    const window = ref(0);

    // Other functions
    async function fetchData(pageNo, pageSize: number, sort?: string, filter?: string) {
      loading.value = true;

      try {
        const dtOptions = mapOptions(options.value);
        dtOptions["filter"] = filter;

        api.get("/Staff/Datatable", dtOptions).then(({ data }) => {
          items.value = data.data || [];
          serverItemsLength.value = data.total;
          loading.value = false;
        });
      } catch (e) {
        // console.log("fetchData failed..", e);
      } finally {
        loading.value = false;
      }
    }

    const handleUpdateOptions = (opt: DataOptions) => {
      const { itemsPerPage, sortBy, sortDesc } = opt;
      setSortOptions(options.value, sortBy, sortDesc);
      options.value.itemsPerPage = itemsPerPage;
      refreshData();
    };

    function refreshData() {
      const params = sortParams(options.value);
      fetchData(options.value.page, options.value.itemsPerPage, params, filter.value);
    }

    function handleDelete(val) {
      item.value = val;
      showDialog.value = true;
    }

    function handleDeleteCancel() {
      showDialog.value = false;
    }

    async function handleDeleteConfirm() {
      await api.delete(`/Staff/${item.value.staffId}`);
      showDialog.value = false;
      refreshData();
    }

    function handleInputBack() {
      window.value = 0;
    }

    function handleInputCancel() {
      window.value = 0;
    }

    function handleInsert() {
      mode.value = "insert";
      item.value = {} as Staff;
      window.value = 1;
    }

    function handleInputSave() {
      handleInputBack();
      refreshData();
    }

    function handleSearch(val) {
      filter.value = val;
    }

    function handleEdit(val) {
      mode.value = "edit";
      item.value = val;
      window.value = 1;
    }

    function groupBy(items: any[], groupBy: string[], groupDesc: boolean[]) {
      return groupItems(items, groupBy, groupDesc);
    }

    return {
      groupBy,
      defaultFooterProps,
      filter,
      headers,
      loading,
      item,
      items,
      mode,
      options,
      serverItemsLength,
      showDialog,
      window,
      handleDelete,
      handleDeleteCancel,
      handleDeleteConfirm,
      handleEdit,
      handleInputBack,
      handleInputCancel,
      handleInputSave,
      handleInsert,
      handleSearch,
      handleUpdateOptions
    };
  }
});
</script>
