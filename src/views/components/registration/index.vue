<template>
  <v-card flat tile height="calc(100vh - 50px)" elevation="0">
    <v-window v-model="window" class="elevation-1" vertical>
      <v-window-item>
        <datatable-title :title="$t('registration.title')"></datatable-title>

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
            <datatable-top-slot @on-search="handleSearch" @on-insert="handleInsert" />
          </template>

          <!-- createdTimestamp slot -->
          <template v-slot:[`item.createdTimestamp`]="{ value }">
            <datatable-iso-date :timestamp="value"> </datatable-iso-date>
          </template>
        </v-data-table>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script lang="ts">
import api from "@/api/crud";

import { defaultFooterProps, mapOptions, sortParams, setSortOptions } from "@/utils/datatable";
import { DataOptions } from "vuetify";
import { Industry } from "@/interfaces/industry";

import { computed, defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "Referlo",

  components: {
    DatatableTopSlot: () => import("@/views/widget/datatable-top-slot.vue"),
    DatatableIsoDate: () => import("@/views/widget/datatable-iso-date.vue"),
    DatatableTitle: () => import("@/views/widget/datatable-title.vue")
  },

  setup(_, { root }) {
    // datatable header
    const headers = computed(() => {
      return [
        { text: root.$t("industry.title"), align: "start", sortable: false, value: "industryId" },
        { text: "Name", value: "industryName" },
        { text: "Created", value: "createdTimestamp" }
      ];
    });

    // datatable options
    const options = ref({ sortBy: ["industryId"], sortDesc: [], itemsPerPage: 10 } as DataOptions);

    // Other datatable settings
    const filter = ref("");
    const loading = ref(false);
    const item = ref<Industry>({} as Industry);
    const items = ref([]);
    const serverItemsLength = ref(0);
    const mode = ref("add");
    // const showDialog = ref(false);
    const window = ref(0);

    // Other functions
    async function fetchData(pageNo, pageSize: number, sort?: string, filter?: string) {
      loading.value = true;

      try {
        const dtOptions = mapOptions(options.value);
        dtOptions["filter"] = filter;

        api.get("/Industry/Datatable", dtOptions).then(({ data }) => {
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

    function handleSearch(val) {
      filter.value = val;
    }

    return {
      defaultFooterProps,
      filter,
      headers,
      loading,
      item,
      items,
      mode,
      options,
      serverItemsLength,
      window,
      handleSearch,
      handleUpdateOptions
    };
  }
});
</script>
