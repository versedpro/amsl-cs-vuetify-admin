<template>
  <v-card @click:outside="handleCancel">
    <validation-observer v-slot="{ invalid }">
      <v-form ref="form" lazy-validation>
        <input-form-title :title="title" @on-back-button="handleBackButton" />

        <v-card-subtitle class="ml-4">{{ id }}</v-card-subtitle>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Product Name" rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="product.productName"
                    :error-messages="errors"
                    label="Name"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Product Localized" v-slot="{ errors }">
                  <v-text-field
                    v-model="product.productLocalized"
                    :error-messages="errors"
                    label="Product Localized"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Status Flag" v-slot="{ errors }">
                  <v-text-field
                    v-model="product.statusFlag"
                    :error-messages="errors"
                    label="Status Flag"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Points" v-slot="{ errors }">
                  <v-text-field
                    v-model="product.points"
                    :error-messages="errors"
                    label="Points"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Created Timestamp" rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="product.createdTimestamp"
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
    const title = computed(() =>
      props.mode == "insert" ? root.$t("product.add") : root.$t("product.edit")
    );

    const id = computed(() => "ID: " + props.item["productId"]);

    const product = ref(props.item);
    watchEffect(() => {
      product.value = props.item;
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
      product,
      handleBackButton,
      handleCancel,
      handleSave,
      handleChange
    };
  }
});
</script>
