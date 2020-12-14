<template>
  <div class="text-center">
    <v-dialog :value="show" width="500">
      <v-card>
        <v-card-title class="overline primary gold--text" color="primary">
          Update Password
        </v-card-title>
        <v-card-text class="pt-0 mt-0">
          <v-form>
            <v-text-field
              v-model="model.currentPassword"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :label="$t('update_password.oldPassword')"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              name="password"
              required
              autocomplete="current-password"
            />
            <v-text-field
              v-model="model.newPassword"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :label="$t('update_password.newPassword')"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              name="password"
              required
              autocomplete="current-password"
            />
            <v-text-field
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :label="$t('update_password.confirmPassword')"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              name="password"
              required
              autocomplete="current-password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn rounded color="primary" text @click="handleCancel">Cancel</v-btn>
          <v-btn rounded color="primary" text @click="handleSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import Axios from "axios";

export default defineComponent({
  name: "Dialog",
  props: {
    show: Boolean
  },
  setup(_, { emit }) {
    const showPassword = ref(false);
    const model = ref({
      login: "",
      currentPassword: "",
      newPassword: ""
    });

    function handleCancel() {
      emit("on-delete-cancel");
    }

    async function handleSave() {
      model.value.login = this.$store.getters.user;
      console.log(model.value);
      await Axios({
        url: "/api/StaffAuth/ChangePassword",
        method: "PUT",
        data: model.value
      })
        .then((response) => {
          emit("on-delete-cancel");
          alert("Password changed!");
        })
        .catch((error) => {
          alert(error);
        });
    }
    return {
      model,
      showPassword,
      handleCancel,
      handleSave
    };
  }
});
</script>
