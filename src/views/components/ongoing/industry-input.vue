<template>
  <v-card>
    <validation-observer v-slot="{ invalid }">
      <v-form ref="form" lazy-validation>
        <input-form-title :title="title" @on-back-button="handleBackButton" />

        <v-divider></v-divider>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="industryId" rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="order.salesOrderId"
                    :error-messages="errors"
                    label="Id"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="name" rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="order.industryName"
                    :error-messages="errors"
                    label="Name"
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="order.description"
                  :error-messages="errors"
                  label="Description"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn rounded color="primary" text @click="handleCancel">{{ $t("input.cancel") }}</v-btn>
          <v-btn rounded text @click="handleSave" :disabled="invalid">{{ $t("input.save") }}</v-btn>
        </v-card-actions>
      </v-form>
    </validation-observer>
  </v-card>
</template>

<script lang="ts">
import { ValidationProvider, ValidationObserver } from "vee-validate";
import "./validations";
import { defineComponent, ref, watchEffect } from "@vue/composition-api";
import api from "@/api/crud";

export default defineComponent({
  name: "industry-input",

  components: {
    ValidationProvider,
    ValidationObserver
  },

  props: {
    mode: String,
    title: String,
    item: Object
  },

  setup(props, { emit }) {
    const order = ref(props.item);
    watchEffect(() => {
      order.value = props.item;
    });

    function handleBackButton() {
      emit("on-input-back");
    }

    function handleCancel() {
      emit("on-input-cancel");
    }

    async function handleSave() {
      if (props.mode === "insert") {
        await api.create("/SalesOrder", order.value);
      } else {
        await api.update(`/SalesOrder/${order.value.supplierId}`, order.value);
      }
      emit("on-input-save", props.mode);
    }

    function handleChange(key, value) {
      emit("on-item-changed", key, value);
    }

    return {
      order,
      handleBackButton,
      handleCancel,
      handleSave,
      handleChange
    };
  }
});
</script>
