<template>
  <v-card flat tile>
    <validation-observer v-slot="{ invalid }">
      <v-form ref="form" lazy-validation>
        <input-form-title :title="title" @on-back-button="handleBackButton" />

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Id" rules="required" v-slot="{ errors }">
                  <v-card-subtitle class="mr-2">{{ industry.industryId }}</v-card-subtitle>
                  <v-text-field
                    v-model="industry.industryId"
                    :error-messages="errors"
                    label="Id"
                    readonly
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Industry Name" rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="industry.industryName"
                    :error-messages="errors"
                    label="Name"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Industry Localized" v-slot="{ errors }">
                  <v-text-field
                    v-model="industry.industryLocalized"
                    :error-messages="errors"
                    label="Industry Localized"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Status" rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="industry.status"
                    :error-messages="errors"
                    label="Status"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Status Flag" v-slot="{ errors }">
                  <v-text-field
                    v-model="industry.statusFlag"
                    :error-messages="errors"
                    label="Status Flag"
                  ></v-text-field>
                </validation-provider>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Description" v-slot="{ errors }">
                  <v-text-field
                    v-model="industry.description"
                    :error-messages="errors"
                    label="Description"
                    rows="4"
                  ></v-text-field>
                  <v-textarea
                    filled
                    auto-grow
                    label="Four rows"
                    rows="4"
                    row-height="30"
                    shaped
                  ></v-textarea>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Row Ranking" v-slot="{ errors }">
                  <v-text-field
                    v-model="industry.rowRanking"
                    :error-messages="errors"
                    label="Row Ranking"
                    single-line
                    type="number"
                    style="width: 60px"
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <!-- The save and cancel button -->
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
  name: "IndustryInput",

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
      props.mode == "insert" ? root.$t("industry.add") : root.$t("industry.edit")
    );

    const industry = ref(props.item);
    watchEffect(() => {
      industry.value = props.item;
    });

    function handleBackButton() {
      emit("on-input-back");
    }

    function handleCancel() {
      emit("on-input-cancel");
    }

    async function handleSave() {
      if (props.mode === "insert") {
        await api.create("/Industry", industry.value);
      } else {
        await api.update(`/Industry/${industry.value.industryId}`, industry.value);
      }
      emit("on-input-save", props.mode);
    }

    return {
      title,
      industry,
      handleBackButton,
      handleCancel,
      handleSave
    };
  }
});
</script>
