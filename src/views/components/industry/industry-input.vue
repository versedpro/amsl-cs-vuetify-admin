<template>
  <v-card flat tile>
    <validation-observer v-slot="{ invalid }">
      <v-form ref="form" lazy-validation>
        <input-form-title :title="title" @on-back-button="handleBackButton" />

        <v-card-subtitle class="ml-4">{{ id }}</v-card-subtitle>
        <v-divider class="my-1"></v-divider>

        <v-card-text class="pt-0 mt-0">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Industry Name" rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="name1"
                    :error-messages="errors"
                    label="Name"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Name 2" v-slot="{ errors }">
                  <v-text-field
                    v-model="name2"
                    :error-messages="errors"
                    label="Name 2"
                  ></v-text-field>
                </validation-provider>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-select :items="status" v-model="industry.status" label="Status"></v-select>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Points" rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="industry.points"
                    :error-messages="errors"
                    label="Points"
                  ></v-text-field>
                </validation-provider>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Description" v-slot="{ errors }">
                  <v-textarea
                    v-model="industry.description"
                    filled
                    auto-grow
                    :error-messages="errors"
                    label="Description"
                    rows="4"
                    row-height="30"
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
    const status = [
      { value: 0, text: "active" },
      { value: 1, text: "suspend" }
    ];

    const title = computed(() =>
      props.mode == "insert" ? root.$t("industry.add") : root.$t("industry.edit")
    );

    const id = computed(() => "ID: " + props.item["industryId"]);

    const industry = ref(props.item);
    const name1 = ref("");
    const name2 = ref("");

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
        industry.value.industryLocalized = { en: name1, hk: name2 };
        await api.update(`/Industry/${industry.value.industryId}`, industry.value);
      }
      emit("on-input-save", props.mode);
    }

    return {
      id,
      title,
      status,
      industry,
      name1,
      name2,
      handleBackButton,
      handleCancel,
      handleSave
    };
  }
});
</script>
