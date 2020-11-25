<template>
  <v-card class="mx-auto pa-0" max-width="800" height="100%" tile>
    <v-card-title class="primary justify-center display-1 text-h5 white--text">
      {{ title }}
      <v-spacer></v-spacer>
      <!-- Close button -->
      <v-btn text icon color="white" @click="onAdd">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>
    <v-simple-table>
      <template v-slot:default>
        <!-- <thead>
          <tr>
            <th class="text-left"></th>
            <th class="text-left">
              Product
            </th>
            <th class="text-left">
              Date
            </th>
          </tr>
        </thead> -->
        <tbody>
          <tr v-for="item in desserts" :key="item.name">
            <td><v-icon color="orange" small>mdi-arrow-right-bold-box</v-icon></td>
            <td>{{ item.name }}</td>
            <td>{{ item.date }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <product-input :show="dialog" :item="edittedItem" :title="dialogTitle"></product-input>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import { Items } from "@/demo/api/mock_products";

export default defineComponent({
  name: "Product",

  components: {
    ProductInput: () => import("./product-input.vue")
  },

  setup() {
    const itemsPerPage = ref(4);
    const desserts = ref(Items);
    const title = "資訊中心";
    const dialog = ref(false);
    const edittedItem = ref({
      name: "",
      id: "",
      title: ""
    });
    const dialogTitle = ref("");
    function onAdd() {
      dialogTitle.value = "Add new";
      dialog.value = true;
    }

    return {
      itemsPerPage,
      desserts,
      title,
      onAdd,
      dialog,
      edittedItem,
      dialogTitle
    };
  }
});
</script>
