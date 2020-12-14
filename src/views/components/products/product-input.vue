<template>
  <v-card flat tile class="grey lighten-3" @click:outside="handleCancel">
    <validation-observer v-slot="{ invalid }">
      <v-form ref="form" lazy-validation>
        <input-form-title :title="title" @on-back-button="handleBackButton" />
        <v-alert border="bottom" color="gold" colored-border class="rounded-0 grey mb-0">{{
          id
        }}</v-alert>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <validation-provider name="Name EN" rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="product.productLocalized['en']"
                    :error-messages="errors"
                    label="Name EN"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6">
                <validation-provider name="Name HK" rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="product.productLocalized['hk']"
                    :error-messages="errors"
                    label="Name HK"
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>

            <!-- <v-col cols="12" sm="6" md="4">
                <validation-provider name="Product Localized" v-slot="{ errors }">
                  <v-text-field
                    v-model="product.productLocalized"
                    :error-messages="errors"
                    label="Product Localized"
                  ></v-text-field>
                </validation-provider>
              </v-col> -->
            <!-- <v-col cols="12" sm="6" md="4">
                <validation-provider name="Product Localized" v-slot="{ errors }"> 
                  <v-text-field
                    v-model="product.productName2"
                    :error-messages="errors"
                    label="Name 2"
                  ></v-text-field>
                </validation-provider>
              </v-col> -->

            <!-- <v-col cols="12" sm="6" md="4">
                <validation-provider name="Status Flag" v-slot="{ errors }">
                  <v-text-field
                    v-model="product.statusFlag"
                    :error-messages="errors"
                    label="Status"
                  ></v-text-field>
                </validation-provider>
              </v-col> -->
            <v-col cols="3" class="pa-0">
              <v-col cols="12" class="pa-0">
                <validation-provider name="Points" v-slot="{ errors }">
                  <v-text-field
                    v-model="product.points"
                    :error-messages="errors"
                    label="Points"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <!-- <v-col cols="12" sm="6" md="4">
                <validation-provider name="Created Timestamp" rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="product.createdTimestamp"
                    :error-messages="errors"
                    label="Created Timestamp"
                  ></v-text-field>
                </validation-provider>
              </v-col> -->
              <v-col cols="12" class="pa-0">
                <v-select :items="status" v-model="product.statusFlag" label="Status"></v-select>
              </v-col>
            </v-col>
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
  </v-card>
</template>

<script lang="ts">
import "./validations";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { computed, defineComponent, ref, watchEffect } from "@vue/composition-api";
import api from "@/api/crud";

export default defineComponent({
  name: "ProductInput",

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
      props.mode == "insert" ? root.$t("product.add") : root.$t("product.edit")
    );

    const id = computed(() => "ID: " + props.item["productId"]);

    const product = ref(props.item);

    watchEffect(() => {
      product.value = props.item;
      if (product.value.productLocalized == null) {
        product.value.productLocalized = { en: "", hk: "" };
      }
    });

    function handleBackButton() {
      emit("on-input-back");
    }

    function handleCancel() {
      emit("on-input-cancel");
    }

    async function handleSave() {
      if (props.mode === "insert") {
        await api.create("/Product", product.value);
      } else {
        await api.update(`/Product/${product.value.productId}`, product.value);
      }
      emit("on-input-save", props.mode);
    }

    function handleChange(key, value) {
      emit("on-item-changed", key, value);
    }

    return {
      id,
      title,
      status,
      product,
      handleBackButton,
      handleCancel,
      handleSave,
      handleChange
    };
  }
});
</script>
