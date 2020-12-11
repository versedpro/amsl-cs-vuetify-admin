<template>
  <v-card tile class="mx-auto" height="auto">
    <v-card-title class="primary justify-center display-1 text-h5 white--text">
      {{ title }}
    </v-card-title>
    <v-card-text>
      <viewer ref="editor" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "@vue/composition-api";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/vue-editor";
import api from "@/api/crud";
import { get } from "lodash";

export default defineComponent({
  name: "Terms",
  components: {
    viewer: Viewer
  },
  setup(_, { refs }) {
    const title = "Terms";

    onMounted(() => {
      api.get("/Industry/2").then(({ data }) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        refs.editor.invoke("setMarkdown", get(JSON.parse(data["meta"]), "html"));
      });
    });

    return {
      title
    };
  }
});
</script>
