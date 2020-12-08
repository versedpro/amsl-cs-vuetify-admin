<template>
  <v-container style="display: flex">
    <v-col cols="6" sm="3" md="2">
      <v-card>
        <draggable :list="industries" class="v-list two-line" group="kanban">
          <v-list-item
            style="cursor: pointer"
            v-for="industry in industries"
            :key="industry.id"
            two-line
          >
            <v-list-item-content>
              <v-list-item-title>{{ industry.id }}</v-list-item-title>
              <v-list-item-subtitle>{{ industry.name }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </draggable>
      </v-card>
    </v-col>
    <v-col cols="6">
      <pre v-for="industry in industries" :key="industry.id">
        {{ JSON.stringify(industry) }}
      </pre>
    </v-col>
  </v-container>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";

import draggable from "vuedraggable";
import { Industries } from "@/demo/api/mock_industry_list";

export default defineComponent({
  components: {
    draggable
  },
  setup() {
    const industries = ref(Industries);
    return {
      industries
    };
  }
});
</script>
