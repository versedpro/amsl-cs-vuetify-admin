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
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "Settings",

  components: {
    InputFormTitle: () => import("@/views/widget/input-form-title.vue")
  },

  setup(_, { root }) {
    const languageSwitch = ref(true);
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

    function handleBackButton() {
      console.log("go back");
    }

    return {
      languageChange,
      languageSwitch,
      languageLabel,
      handleBackButton,
      setLocale
    };
  }
});
</script>
