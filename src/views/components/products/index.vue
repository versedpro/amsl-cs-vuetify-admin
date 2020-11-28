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
          <tr v-for="item in products" :key="item.productId">
            <td><v-icon color="orange" small>mdi-arrow-right-bold-box</v-icon></td>
            <td>{{ item.productName }}</td>
            <td>{{ item.createdTimestamp }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <product-input
      :show="dialog"
      @on-item-changed="(key, value) => editedItem[key] = value"
      :item="editedItem"
      :title="dialogTitle"
      @on-cancel-input="onCancelInput"
      @on-save-input="onSaveInput"
    ></product-input>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, onActivated } from "@vue/composition-api";
import ProductApi from "./api";

export default defineComponent({
  name: "Product",

  components: {
    ProductInput: () => import("./product-input.vue")
  },

  setup() {
    const itemsPerPage = ref(4);
    const products = ref([]);
    const title = "資訊中心";
    const dialog = ref(false);
    const editedItem = ref({
      productName: "",
      productId: ""
    });
    const dialogTitle = ref("");

    function onAdd() {
      dialogTitle.value = "Add new";
      dialog.value = true;
    }

    function fetchProducts() {
      // loading.value = true;
      ProductApi.list().then(({ data }) => {
        products.value = data;
        // loading.value = false;
      });
    }

    onActivated(() => {
      fetchProducts();
    });

    function onSaveInput() {
      dialog.value = false;
      if (this.editedIndex > -1) {
        ProductApi.update(this.editedItem.supplierId, this.editedItem).then(({ data }) => {
          Object.assign(products.value[this.editedIndex], data);
        });
      } else {
        ProductApi.create(this.editedItem).then(({ data }) => {
          products.value.push(data);
        });
      }
    }

    function onCancelInput() {
      dialog.value = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    }

    return {
      itemsPerPage,
      title,
      onAdd,
      dialog,
      editedItem,
      dialogTitle,
      products,
      onCancelInput,
      onSaveInput
    };
  }
});
</script>
