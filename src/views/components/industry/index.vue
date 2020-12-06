<template>
  <v-card flat tile height="calc(100vh - 50px)" class="pa-4" elevation="0">
    <v-window v-model="window" class="elevation-1" vertical>
      <v-window-item>
        <v-card-title class="primary justify-center white--text"
          >{{ $t("industry.title") }}
        </v-card-title>

        <v-data-table
          class="elevation-1"
          :footer-props="defaultFooterProps"
          :headers="headers"
          :items="items"
          :items-per-page="options.itemsPerPage"
          :loading="loading"
          :options.sync="options"
          :server-items-length="serverItemsLength"
          @update:options="handleUpdateOptions"
        >
          <!-- Top Slot -->
          <template v-slot:top>
            <datatable-top-slot
              @on-search="handleSearch"
              @on-item-add="handleInsert()"
            ></datatable-top-slot>
          </template>

          <!-- Action Slot -->
          <template v-slot:[`item.actions`]="{ item }">
            <datatable-action-slot
              @on-update="handleUpdate(item)"
              @on-delete="onDelete(item.industryId)"
              class="gold--text"
            >
            </datatable-action-slot>
          </template>
        </v-data-table>
      </v-window-item>
      <v-window-item>
        <industry-input
          :mode="mode"
          :item="item"
          @on-cancel-input="onCancelInput"
          @on-save-input="onCancelInput"
          @on-back-button="handleBackButton"
        ></industry-input>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import IndustryApi from "./api";
import { defaultFooterProps, mapOptions, sortParams, setSortOptions } from "@/utils/datatable";
import { DataOptions } from "vuetify";
import { Industry } from "@/interfaces/industry";

export default defineComponent({
  name: "Industry",

  components: {
    IndustryInput: () => import("./industry-input.vue"),
    DatatableActionSlot: () => import("@/views/widget/datatable-action-slot.vue"),
    DatatableTopSlot: () => import("@/views/widget/datatable-top-slot.vue")
  },

  setup() {
    // datatable header
    const headers = ref([
      { text: "Id", align: "start", sortable: false, value: "industryId" },
      { text: "Name", value: "industryName" },
      { text: "Created", value: "createdTimestamp" },
      { text: null, value: "actions", sortable: false, align: "right" }
    ]);

    // datatable options
    const options = ref({ sortBy: ["industryId"], sortDesc: [], itemsPerPage: 10 } as DataOptions);

    // Other datatable settings
    const loading = ref(false);
    const item = ref<Industry>({} as Industry);
    const items = ref([]);
    const filter = ref("");
    const serverItemsLength = ref(0);
    const mode = ref("add");
    const window = ref(0);

    // Other functions
    async function fetchData(pageNo, pageSize: number, sort?: string, filter?: string) {
      loading.value = true;

      try {
        const dtOptions = mapOptions(options.value);
        dtOptions["filter"] = filter;

        IndustryApi.datatable(dtOptions).then(({ data }) => {
          items.value = data.data || [];
          serverItemsLength.value = data.total;
          loading.value = false;
        });
      } catch (e) {
        console.log("fetchDepots failed..", e);
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

    function handleBackButton() {
      window.value = 0;
    }

    function onCancelInput() {
      window.value = 0;
    }

    function handleInsert() {
      mode.value = "insert";
      item.value = {} as Industry;
      window.value = 1;
    }

    function handleSearch(event) {
      console.log(event);
    }

    function handleUpdate(event) {
      console.log(event);
    }

    return {
      defaultFooterProps,
      loading,
      headers,
      options,
      item,
      items,
      filter,
      window,
      serverItemsLength,
      mode,
      onCancelInput,
      handleBackButton,
      handleInsert,
      handleSearch,
      handleUpdate,
      handleUpdateOptions
    };
  }
});
</script>
