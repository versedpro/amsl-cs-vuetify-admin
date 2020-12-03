<template>
  <v-card tile class="mx-auto" height="auto">
    <v-card-title class="primary justify-center display-1 text-h5 white--text">
      {{ title }}
    </v-card-title>

    <v-form>
      <v-card-text>
        <v-row>
          <v-col cols="6" md="6">
            <v-subheader class="pa-0"> Language </v-subheader>
            <v-btn block @click.stop="dialog = true">
              {{ selectedLanguage }}
              <v-spacer></v-spacer>
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-form>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="gold" class="mr-4"> Save </v-btn>
      <v-btn color="primary" class="mr-4"> Cancel </v-btn>
    </v-card-actions>

    <v-dialog v-model="dialog" scrollable persistent max-width="600px">
      <v-card>
        <v-card-text style="height: 300px">
          <v-radio-group v-model="language" @change="dialog = false" mandatory>
            <v-radio
              v-for="(item, i) in locales"
              :key="i"
              :label="item.title"
              :value="item.locale"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "@vue/composition-api";
import { locales } from "@/locale/available";

export default defineComponent({
  name: "Setting",

  setup() {
    const title = "Setting Page";
    const dialog = ref(false);
    const language = ref("en");

    const selectedLanguage = computed(() => {
      return locales.filter((l) => l.locale === language.value)[0].title;
    });

    return {
      title,
      dialog,
      language,
      locales,
      selectedLanguage
    };
  }
});
</script>
