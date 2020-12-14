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
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :label="$t('update_password.oldPassword')"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              name="password"
              required
              autocomplete="current-password"
            />
            <v-text-field
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
          <v-btn rounded color="primary" text @click="handleCancel">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "Dialog",
  props: {
    show: Boolean
  },
  setup(_, { emit }) {
    const showPassword = ref(false);

    function handleCancel() {
      emit("on-delete-cancel");
    }
    return {
      showPassword,
      handleCancel
    };
  }
});
</script>
