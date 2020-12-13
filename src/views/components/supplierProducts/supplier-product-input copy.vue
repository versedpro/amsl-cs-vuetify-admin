<template>
  <v-card flat tile class="grey lighten-3">
    <input-form-title :title="title" @on-back-button="handleBackButton" />

    <validation-observer v-slot="{ invalid }">
      <v-form ref="form" lazy-validation>
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
                <v-select
                  :items="status"
                  v-model="supplierProduct.status"
                  label="Status"
                ></v-select>
              </v-col>
              <!-- <v-col cols="12" sm="6" md="4">
                <validation-provider name="Status" v-slot="{ errors }">
                  <v-text-field
                    v-model="supplierProduct.status"
                    :error-messages="errors"
                    label="Status"
                  ></v-text-field>
                </validation-provider>
              </v-col> -->
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
        <v-alert border="top" color="gold" colored-border class="rounded-0 grey lighten-3 mb-0">
          <input-form-action
            :invalid="invalid"
            @on-cancel="handleCancel"
            @on-save="handleSave"
          ></input-form-action>
        </v-alert>
      </v-form>
    </validation-observer>

    <v-card flat tile class="my-0 px-4" color="orange lighten-5">
      <v-card-title>test</v-card-title>
      <v-card-actions>
        <v-flex>
          <v-btn @click="openFileDialog" height="fit-content" width="fit-content" class="pa-0">
            <!-- added two img tags because browser is not letting  -->
            <!-- change the image src across domains -->
            <v-img
              v-if="!uploaded"
              :src="remoteSrc"
              lazy-src="https://picsum.photos/id/11/10/6"
              max-width="250"
            ></v-img>

            <v-img
              v-else
              lazy-src="https://picsum.photos/id/11/10/6"
              max-width="250"
              :src="src"
            ></v-img>
            <input ref="uploader" @change="preview" class="d-none" type="file" accept="image/*" />
          </v-btn>
          <div>
            <p class="pt-2 red--text" v-if="invalidAspect">Aspect ratio is not correct</p>
          </div>
          <v-btn class="align-self-center mt-4" @click="upload" :disabled="invalidAspect">
            Upload
          </v-btn>
        </v-flex>
        <v-spacer></v-spacer>
        <v-text-field label="Remarks"></v-text-field>
      </v-card-actions>
    </v-card>
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
    const status = [
      { value: 0, text: "active" },
      { value: 1, text: "suspend" }
    ];
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
      status,
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
