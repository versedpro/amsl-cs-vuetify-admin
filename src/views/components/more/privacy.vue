<template>
  <v-card tile class="mx-auto" height="auto">
    <v-card-title class="primary justify-center display-1 text-h5 white--text">
      {{ title }}
    </v-card-title>
    <v-card-text>
      <editor ref="editor" />
    </v-card-text>
    <v-card-actions>
      <v-btn @click="save"> Save </v-btn>
    </v-card-actions>
    <v-snackbar v-model="saved" :timeout="1000">Saved</v-snackbar>
  </v-card>
</template>

<script lang="ts">
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import { defineComponent, ref } from "@vue/composition-api";
import api from "@/api/crud";
import { get } from "lodash";

export default defineComponent({
  name: "Privacy",

  components: {
    editor: Editor
  },

  setup(_, { refs }) {
    const title = "Privacy";
    const industry = ref([]);
    const saved = ref(false);

    api.get("/Industry/2").then(({ data }) => {
      industry.value = data;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      refs.editor.invoke("setHtml", get(JSON.parse(industry.value["meta"]), "html"));
    });

    function save() {
      let html = this.$refs.editor.invoke("getHtml");
      let meta = JSON.parse(industry.value["meta"] || "");
      meta.html = html;
      industry.value["meta"] = JSON.stringify(meta);
      api.update("/Industry/2", industry.value);
      saved.value = true;
    }

    return {
      title,
      save,
      saved
    };
  }
});
</script>
