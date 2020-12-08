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
                  <v-text-field
                    v-model="staff.staffId"
                    :error-messages="errors"
                    label="Id"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Staff Name" rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="staff.staffAlias"
                    :error-messages="errors"
                    label="Name"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="First Name" v-slot="{ errors }">
                  <v-text-field
                    v-model="staff.firstName"
                    :error-messages="errors"
                    label="First Name"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Last Name" rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="staff.lastName"
                    :error-messages="errors"
                    label="Last Name"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Code" v-slot="{ errors }">
                  <v-text-field
                    v-model="staff.roleCode"
                    :error-messages="errors"
                    label="Code"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Created By" v-slot="{ errors }">
                  <v-text-field
                    v-model="staff.createdBy"
                    :error-messages="errors"
                    label="Created By"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Status Flag" v-slot="{ errors }">
                  <v-text-field
                    v-model="staff.statusFlag"
                    :error-messages="errors"
                    label="Status Flag"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <validation-provider name="Created Timestamp" rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="staff.createdTimestamp"
                    :error-messages="errors"
                    label="Created Timestamp"
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
  name: "StaffInput",

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
      props.mode == "insert" ? root.$t("staff.add") : root.$t("staff.edit")
    );

    const staff = ref(props.item);
    watchEffect(() => {
      staff.value = props.item;
    });

    function handleBackButton() {
      emit("on-input-back");
    }

    function handleCancel() {
      emit("on-input-cancel");
    }

    async function handleSave() {
      if (props.mode === "insert") {
        await api.create("/Staff", staff.value);
      } else {
        await api.update(`/Staff/${staff.value.staffId}`, staff.value);
      }
      emit("on-input-save", props.mode);
    }

    return {
      title,
      staff,
      handleBackButton,
      handleCancel,
      handleSave
    };
  }
});
</script>
