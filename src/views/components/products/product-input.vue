<template>
  <v-card @click:outside="handleCancel">
    <validation-observer v-slot="{ invalid }">
      <v-form ref="form" lazy-validation>
        <input-form-title :title="title" @on-back-button="handleBackButton" />

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Id" rules="required" v-slot="{ errors }">
                  <v-text-field
                    :value="item.productId"
                    @input="handleChange('productId', $event)"
                    :error-messages="errors"
                    label="Id"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Product Name" rules="required" v-slot="{ errors }">
                  <v-text-field
                    :value="item.productName"
                    @input="handleChange('productName', $event)"
                    :error-messages="errors"
                    label="Name"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Product Localized" v-slot="{ errors }">
                  <v-text-field
                    :value="item.productLocalized"
                    @input="handleChange('productLocalized', $event)"
                    :error-messages="errors"
                    label="Product Localized"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Status Flag" v-slot="{ errors }">
                  <v-text-field
                    :value="item.statusFlag"
                    @input="handleChange('statusFlag', $event)"
                    :error-messages="errors"
                    label="Status Flag"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Meta" v-slot="{ errors }">
                  <v-text-field
                    :value="item.meta"
                    @input="handleChange('meta', $event)"
                    :error-messages="errors"
                    label="Meta"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Points" v-slot="{ errors }">
                  <v-text-field
                    :value="item.points"
                    @input="handleChange('points', $event)"
                    :error-messages="errors"
                    label="Points"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Created Timestamp" rules="required" v-slot="{ errors }">
                  <v-text-field
                    :value="item.createdTimestamp"
                    @input="handleChange('createdTimestamp', $event)"
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
import { computed, defineComponent } from "@vue/composition-api";

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
      props.mode == "insert" ? root.$t("products.add") : root.$t("products.edit")
    );

    function handleBackButton() {
      emit("on-input-back");
    }

    function handleCancel() {
      emit("on-input-cancel");
    }

    function handleSave() {
      emit("on-input-save", props.mode);
    }

    function handleChange(key, value) {
      emit("on-item-changed", key, value);
    }

    return {
      title,
      handleBackButton,
      handleCancel,
      handleSave,
      handleChange
    };
  }
});
</script>
