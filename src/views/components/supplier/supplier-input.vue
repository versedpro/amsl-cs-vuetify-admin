<template>
  <v-card>
    <validation-observer v-slot="{ invalid }">
      <v-form ref="form" lazy-validation>
        <v-card>
          <input-form-title :title="title" @on-back-button="onBackButton" />
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <validation-provider name="Id" rules="required" v-slot="{ errors }">
                    <v-text-field
                      :value="item.supplierId"
                      @input="handleChange('supplierId', $event)"
                      :error-messages="errors"
                      label="Id"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <validation-provider name="Supplier Name" rules="required" v-slot="{ errors }">
                    <v-text-field
                      :value="item.supplierName"
                      @input="handleChange('supplierName', $event)"
                      :error-messages="errors"
                      label="Name"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <validation-provider name="Display Name" v-slot="{ errors }">
                    <v-text-field
                      :value="item.displayName"
                      @input="handleChange('displayName', $event)"
                      :error-messages="errors"
                      label="Display Name"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <validation-provider name="Ranking" v-slot="{ errors }">
                    <v-text-field
                      :value="item.ranking"
                      @input="handleChange('ranking', $event)"
                      :error-messages="errors"
                      label="Ranking"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <!-- <v-col cols="12" sm="6" md="4">
                  <validation-provider name="Meta" v-slot="{ errors }">
                    <v-text-field
                      :value="item.meta"
                      @input="handleChange('meta', $event)"
                      :error-messages="errors"
                      label="Meta"
                    ></v-text-field>
                  </validation-provider>
                </v-col> -->
                <v-col cols="12" sm="6" md="4">
                  <validation-provider name="CreatedBy" v-slot="{ errors }">
                    <v-text-field
                      :value="item.createdBy"
                      @input="handleChange('createdBy', $event)"
                      :error-messages="errors"
                      label="CreatedBy"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <validation-provider name="Status" v-slot="{ errors }">
                    <v-text-field
                      :value="item.status"
                      @input="handleChange('status', $event)"
                      :error-messages="errors"
                      label="Status"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <validation-provider
                    name="Created Timestamp"
                    rules="required"
                    v-slot="{ errors }"
                  >
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

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn rounded color="primary" text @click="handleCancel"
              >{{ $t("input.cancel") }}
            </v-btn>
            <v-btn rounded text @click="handleSave" :disabled="invalid"
              >{{ $t("input.save") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </validation-observer>
  </v-card>
</template>

<script lang="ts">
import "./validations";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { computed, defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "SupplierInput",

  components: {
    // InputFormAction: () => import("@/views/widget/input-form-action.vue"),
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
      props.mode == "insert" ? root.$t("supplier.add") : root.$t("supplier.edit")
    );

    function handleCancel() {
      emit("on-cancel-input");
    }

    function handleSave() {
      emit("on-save-input", props.mode);
    }

    function handleChange(key, value) {
      emit("on-item-changed", key, value);
    }

    function onBackButton() {
      emit("on-back-button");
    }

    return {
      title,
      handleCancel,
      handleSave,
      handleChange,
      onBackButton
    };
  }
});
</script>
