<template>
  <v-dialog :value="show" max-width="500px" @click:outside="handleCancel">
    <validation-observer v-slot="{ invalid }">
      <v-form ref="form" lazy-validation>
        <v-card>
          <v-card-title class="py-1 px-3">
            <span>{{ title }}</span>
            <v-spacer></v-spacer>
            <!-- Close button -->
            <v-btn text icon color="primary" @click="handleCancel">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <validation-provider name="Id" rules="required" v-slot="{ errors }">
                    <v-text-field
                      :value="item.supplierProductId"
                      @input="handleChange('supplierProductId', $event)"
                      :error-messages="errors"
                      label="Id"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <validation-provider name="ProductId" rules="required" v-slot="{ errors }">
                    <v-text-field
                      :value="item.productId"
                      @input="handleChange('productId', $event)"
                      :error-messages="errors"
                      label="ProductId"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <validation-provider name="SupplierId" rules="required" v-slot="{ errors }">
                    <v-text-field
                      :value="item.supplierId"
                      @input="handleChange('supplierId', $event)"
                      :error-messages="errors"
                      label="SupplierId"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <validation-provider name="Remarks" rules="required" v-slot="{ errors }">
                    <v-text-field
                      :value="item.remarks"
                      @input="handleChange('remarks', $event)"
                      :error-messages="errors"
                      label="Remarks"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <validation-provider name="Points Limit"  v-slot="{ errors }">
                    <v-text-field
                      :value="item.pointsLimit"
                      @input="handleChange('pointsLimit', $event)"
                      :error-messages="errors"
                      label="Points Limit"
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
                  <validation-provider name="Status"  v-slot="{ errors }">
                    <v-text-field
                      :value="item.status"
                      @input="handleChange('status', $event)"
                      :error-messages="errors"
                      label="Status"
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
                  <validation-provider name="CreatedBy"  v-slot="{ errors }">
                    <v-text-field
                      :value="item.createdBy"
                      @input="handleChange('createdBy', $event)"
                      :error-messages="errors"
                      label="CreatedBy"
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
  </v-dialog>
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
      handleCancel,
      handleSave,
      handleChange
    };
  }
});
</script>
