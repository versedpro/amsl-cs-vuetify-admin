<template>
  <v-card flat tile>
    <validation-observer v-slot="{ invalid }">
      <v-form ref="form" lazy-validation>
        <input-form-title :title="title" @on-back-button="handleBackButton" />

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Id" rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="supplierProduct.supplierProductId"
                    :error-messages="errors"
                    label="Id"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="ProductId" rules="required" v-slot="{ errors }">
                  <v-select
                    v-model="supplierProduct.productId"
                    :items="products"
                    :error-messages="errors"
                    item-text="productName"
                    item-value="productId"
                    label="ProductId"
                  ></v-select>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="SupplierId" rules="required" v-slot="{ errors }">
                  <v-select
                    v-model="supplierProduct.supplierId"
                    :items="suppliers"
                    :error-messages="errors"
                    item-text="supplierName"
                    item-value="supplierId"
                    label="SupplierId"
                  ></v-select>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Remarks" rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="supplierProduct.remarks"
                    :error-messages="errors"
                    label="Remarks"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Points Limit" v-slot="{ errors }">
                  <v-text-field
                    v-model="supplierProduct.pointsLimit"
                    :error-messages="errors"
                    label="Points Limit"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Points" v-slot="{ errors }">
                  <v-text-field
                    v-model="supplierProduct.points"
                    :error-messages="errors"
                    label="Points"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Status" v-slot="{ errors }">
                  <v-text-field
                    v-model="supplierProduct.status"
                    :error-messages="errors"
                    label="Status"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <!-- <v-col cols="12" sm="6" md="4">
                <validation-provider name="Meta" v-slot="{ errors }">
                  <v-text-field
                    v-model="supplierProduct.meta"
                    :error-messages="errors"
                    label="Meta"
                  ></v-text-field>
                </validation-provider>
              </v-col> -->
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="CreatedBy" v-slot="{ errors }">
                  <v-text-field
                    v-model="supplierProduct.createdBy"
                    :error-messages="errors"
                    label="CreatedBy"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Created Timestamp" rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="supplierProduct.createdTimestamp"
                    :error-messages="errors"
                    label="Created Timestamp"
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <input-form-action
          :invalid="invalid"
          @on-cancel="handleCancel"
          @on-save="handleSave"
        ></input-form-action>
      </v-form>
    </validation-observer>
  </v-card>
</template>

<script lang="ts">
import "./validations";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { computed, defineComponent, ref, watchEffect } from "@vue/composition-api";
import api from "@/api/crud";

export default defineComponent({
  name: "SupplierProductInput",

  components: {
    InputFormAction: () => import("@/views/widget/input-form-action.vue"),
    InputFormTitle: () => import("@/views/widget/input-form-title.vue"),
    ValidationProvider,
    ValidationObserver
  },

  props: {
    mode: String,
    item: {
      type: Object,
      required: true
    }
  },

  setup(props, { emit, root }) {
    const title = computed(() =>
      props.mode == "insert" ? root.$t("supplier_products.add") : root.$t("supplier_products.edit")
    );

    let products = ref([]);
    let suppliers = ref([]);

    const supplierProduct = ref(props.item);
    watchEffect(() => {
      supplierProduct.value = props.item;
    });

    function fetchProducts() {
      api.get("/Product", []).then(({ data }) => {
        products.value = data;
      });
    }

    function fetchSuppliers() {
      api.get("/Supplier", []).then(({ data }) => {
        suppliers.value = data;
      });
    }

    fetchSuppliers();
    fetchProducts();

    function handleBackButton() {
      emit("on-input-back");
    }

    function handleCancel() {
      emit("on-input-cancel");
    }

    async function handleSave() {
      if (props.mode === "insert") {
        await api.create("/SupplierProduct", supplierProduct.value);
      } else {
        await api.update(
          `/SupplierProduct/${supplierProduct.value.supplierProductId}`,
          supplierProduct.value
        );
      }

      emit("on-input-save", props.mode);
    }

    function handleChange(key, value) {
      emit("on-item-changed", key, value);
    }

    return {
      title,
      products,
      suppliers,
      supplierProduct,
      handleBackButton,
      handleCancel,
      handleSave,
      handleChange
    };
  }
});
</script>
