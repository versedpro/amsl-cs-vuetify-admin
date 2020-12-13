<template>
  <v-card class="mx-auto">
    <input-form-title :title="$t('settings.title')" @on-back-button="handleBackButton" />

    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ $t("settings.language") }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action class="d-flex align-center" height="100%">
          <v-switch
            v-model="languageSwitch"
            inset
            :label="languageLabel"
            @change="languageChange"
          ></v-switch>
        </v-list-item-action>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Version</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item @click="handleChangePassword">
        <v-list-item-content>
          <v-list-item-title>Password Change</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <password-change-dialog
      :show="showDialog"
      @on-delete-cancel="handleDeleteCancel"
    ></password-change-dialog>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "@vue/composition-api";
import PasswordChangeDialog from "./password-change-dialog.vue";

export default defineComponent({
  name: "Settings",
  components: {
    InputFormTitle: () => import("@/views/widget/input-form-title.vue"),
    PasswordChangeDialog
  },

  setup(_, { root }) {
    const languageSwitch = ref(true);
    const showDialog = ref(false);
    const languageLabel = computed(() => (languageSwitch.value ? "Eng" : "繁體中文"));

    async function setLocale(locale) {
      //console.log(locale);
      // $store
      await root.$store.dispatch("SetLocale", { locale });
    }

    function languageChange(val) {
      const locale = val ? "en" : "hk";
      setLocale(locale);
    }

    function handleChangePassword() {
      // alert("ddd");
      showDialog.value = true;
    }
    function handleDeleteCancel() {
      showDialog.value = false;
    }

    return {
      languageChange,
      languageSwitch,
      languageLabel,
      showDialog,
      setLocale,
      handleDeleteCancel,
      handleChangePassword
    };
  }
});
</script>
