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
                    :value="item.industryId"
                    @input="handleChange('industryId', $event)"
                    :error-messages="errors"
                    label="Id"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="name" rules="required" v-slot="{ errors }">
                  <v-text-field
                    :value="item.industryName"
                    @input="handleChange('industryName', $event)"
                    :error-messages="errors"
                    label="Name"
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  :value="item.description"
                  @input="handleChange('description', $event)"
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

import { defineComponent } from "@vue/composition-api";

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
      handleBackButton,
      handleCancel,
      handleSave,
      handleChange
    };
  }
});
</script>
