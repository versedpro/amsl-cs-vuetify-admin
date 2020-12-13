<template>
  <v-card flat tile class="grey lighten-3">
    <validation-observer v-slot="{ invalid }">
      <v-form ref="form" lazy-validation>
        <input-form-title :title="title" @on-back-button="handleBackButton" />
        <v-alert border="bottom" color="gold" colored-border class="rounded-0 grey"
          >ID. 1234</v-alert
        >
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <validation-provider name="Supplier Name" rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="supplier.supplierName"
                    :error-messages="errors"
                    label="Name 1"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6">
                <validation-provider name="Display Name" v-slot="{ errors }">
                  <v-text-field
                    v-model="supplier.displayName"
                    :error-messages="errors"
                    label="Name 2"
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>

            <!-- <v-col cols="12" sm="6" md="4">
                <validation-provider name="Ranking" v-slot="{ errors }">
                  <v-text-field
                    v-model="supplier.ranking"
                    :error-messages="errors"
                    label="Ranking"
                  ></v-text-field>
                </validation-provider>
              </v-col> -->

            <!-- <v-col cols="12" sm="6" md="4">
                <validation-provider name="CreatedBy" v-slot="{ errors }">
                  <v-text-field
                    v-model="supplier.createdBy"
                    :error-messages="errors"
                    label="CreatedBy"
                  ></v-text-field>
                </validation-provider>
              </v-col> -->
            <v-col cols="3" class="pa-0">
              <v-col cols="12" class="pa-0">
                <v-select :items="status" v-model="supplier.status" label="Status"></v-select>
              </v-col>
            </v-col>
            <!-- <v-col cols="12" sm="6" md="4">
                <validation-provider name="Status" v-slot="{ errors }">
                  <v-text-field
                    v-model="supplier.status"
                    :error-messages="errors"
                    label="Status"
                  ></v-text-field>
                </validation-provider>
              </v-col> -->
            <!-- <v-col cols="12" sm="6" md="4">
                <validation-provider name="Created Timestamp" rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="supplier.createdTimestamp"
                    :error-messages="errors"
                    label="Created Timestamp"
                  ></v-text-field>
                </validation-provider>
              </v-col> -->
          </v-container>
        </v-card-text>

        <!-- The save and cancel button -->
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
  name: "SupplierInput",

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
      props.mode == "insert" ? root.$t("supplier.add") : root.$t("supplier.edit")
    );

    const supplier = ref(props.item);
    let industry = ref([]);
    watchEffect(() => {
      supplier.value = props.item;
    });

    function fetchIndustry() {
      api.get("/Industry", []).then(({ data }) => {
        industry.value = data;
      });
    }
    fetchIndustry();

    function handleBackButton() {
      emit("on-input-back");
    }

    function handleCancel() {
      emit("on-input-cancel");
    }

    async function handleSave() {
      if (props.mode === "insert") {
        await api.create("/Supplier", supplier.value);
      } else {
        await api.update(`/Supplier/${supplier.value.supplierId}`, supplier.value);
      }
      emit("on-input-save", props.mode);
    }

    function handleChange(key, value) {
      emit("on-item-changed", key, value);
    }

    return {
      title,
      status,
      supplier,
      industry,
      handleBackButton,
      handleCancel,
      handleSave,
      handleChange
    };
  }
});
</script>
