<template>
  <v-card flat tile class="grey lighten-3">
    <input-form-title :title="title" @on-back-button="handleBackButton" />

    <v-card-text>
      <mc-wysiwyg v-model="html"></mc-wysiwyg>
    </v-card-text>

    <v-card-text v-html="remark"> </v-card-text>

    <v-card-actions>
      <v-btn @click="save"> Save </v-btn>
      <v-btn @click="cancel"> Cancel </v-btn>
    </v-card-actions>
    <v-snackbar v-model="saved" :timeout="1000">Saved</v-snackbar>
  </v-card>
</template>

<script lang="ts">
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { McWysiwyg } from "@mycure/vue-wysiwyg";

import { computed, defineComponent, ref } from "@vue/composition-api";
import api from "@/api/crud";
// import { get } from "lodash";

export default defineComponent({
  name: "PrivacyInput",

  components: {
    InputFormTitle: () => import("@/views/widget/input-form-title.vue"),
    McWysiwyg
    // editor: Editor
  },

  props: {
    item: {
      type: Object,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },

  setup(props, { emit }) {
    const title = ref("Privacy Input");
    const industry = ref(props.item);
    const saved = ref(false);
    const html = ref("");

    const supplierProduct = ref(props.item);

    // watchEffect(() => {
    //   supplierProduct.value = props.item;
    // });

    const remark = computed(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // refs.editor.invoke("setHtml", get(JSON.parse(props.item["meta"]), "html"));

      return JSON.parse(props.item["meta"]);
    });

    // onMounted(() => {
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   refs.editor.invoke("setHtml", get(JSON.parse(props.item["meta"]), "html"));
    // });

    // watch("props.id", (first, second) => {
    //   console.log("Watch props.selected function called with args:", first, second);
    //   // Both props are undefined so its just a bare callback func to be run
    // });

    async function save() {
      const html = this.$refs.editor.invoke("getHtml");

      const meta = JSON.parse(industry.value["meta"] || {});
      meta.html = html;

      supplierProduct.value["meta"] = JSON.stringify(meta);

      await api.update(
        `/SupplierProduct/${supplierProduct.value.supplierProductId}`,
        supplierProduct.value
      );
      saved.value = true;
    }

    // function cancel() {
    //   emit("on-input-back");
    // }

    function handleBackButton() {
      emit("on-input-back");
    }

    return {
      title,
      save,
      // cancel,
      saved,
      remark,
      html,
      handleBackButton
    };
  }
});
</script>
