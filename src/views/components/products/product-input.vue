<template>
  <v-card @click:outside="handleCancel">
    <validation-observer v-slot="{ invalid }">
      <v-form ref="form" lazy-validation>
        <v-card>
          <v-card-title class="py-1 px-3">
            <v-btn icon @click="handleBackButton">
        <v-icon large>mdi-chevron-left</v-icon>
      </v-btn>
            
            <v-spacer></v-spacer>
            <span>{{ title }}</span>
            <!-- Close button -->
            <!-- <v-btn text icon color="primary" @click="handleCancel">
              <v-icon>mdi-close</v-icon>
            </v-btn> -->
          </v-card-title>
          <v-divider></v-divider>

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
                  <validation-provider name="Product Localized"  v-slot="{ errors }">
                    <v-text-field
                      :value="item.productLocalized"
                      @input="handleChange('productLocalized', $event)"
                      :error-messages="errors"
                      label="Product Localized"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <validation-provider name="Status Flag"  v-slot="{ errors }">
                    <v-text-field
                      :value="item.statusFlag"
                      @input="handleChange('statusFlag', $event)"
                      :error-messages="errors"
                      label="Status Flag"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <validation-provider name="Meta"  v-slot="{ errors }">
                    <v-text-field
                      :value="item.meta"
                      @input="handleChange('meta', $event)"
                      :error-messages="errors"
                      label="Meta"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <validation-provider name="Points"  v-slot="{ errors }">
                    <v-text-field
                      :value="item.points"
                      @input="handleChange('points', $event)"
                      :error-messages="errors"
                      label="Points"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <validation-provider name="Created Timestamp"  rules="required"  v-slot="{ errors }">
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
import { defineComponent } from "@vue/composition-api";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import "./validations";

export default defineComponent({
  name: "product-input",

  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    show: Boolean,
    title: String,
    item: Object
  },

  setup() {
    function handleBackButton() {
      this.$emit("on-back-button");
    }

    function handleCancel() {
      this.$emit("on-cancel-input");
    }

    function handleSave() {
      this.$emit("on-save-input");
    }

    function handleChange(key, value) {
      this.$emit("on-item-changed", key, value);
    }

    return {
      // update,
      handleBackButton,
      handleCancel,
      handleSave,
      handleChange
    };
  }
});
</script>
