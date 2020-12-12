<template>
  <v-card flat tile class="grey lighten-3">
    <validation-observer v-slot="{ invalid }">
      <v-form ref="form" lazy-validation>
        <input-form-title :title="title" @on-back-button="handleBackButton" />

        <v-alert border="bottom" color="gold" colored-border class="rounded-0 grey">{{
          id
        }}</v-alert>

        <v-card-text class="pt-0 mt-0">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <validation-provider name="Name1" rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="name1"
                    :error-messages="errors"
                    label="Name 1"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6">
                <validation-provider name="Name 2" v-slot="{ errors }">
                  <v-text-field
                    v-model="name2"
                    :error-messages="errors"
                    label="Name 2"
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>
            <v-col cols="3" class="pa-0">
              <v-col cols="12" class="pa-0">
                <validation-provider name="Points" rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="industry.points"
                    :error-messages="errors"
                    label="Points"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" class="pa-0">
                <validation-provider name="Row Ranking" v-slot="{ errors }">
                  <v-text-field
                    v-model="industry.rowRanking"
                    :error-messages="errors"
                    label="Row Ranking"
                    single-line
                    type="number"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" class="pa-0">
                <v-select :items="status" v-model="industry.statusFlag" label="Status"></v-select>
              </v-col>
            </v-col>

            <!-- 
              <v-col cols="12" sm="6">
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
              </v-col> -->
          </v-container>
        </v-card-text>
        <v-alert border="top" color="gold" colored-border class="rounded-0 grey lighten-3 mb-0">
          <input-form-action
            :invalid="invalid"
            @on-cancel="handleCancel"
            @on-save="handleSave"
          ></input-form-action>
        </v-alert>

        <!-- The save and cancel button -->
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
