<template>
  <v-card flat tile class="grey lighten-3">
    <input-form-title :title="title" @on-back-button="handleBackButton" />

    <v-card-text>
      <v-card-title class="primary--text px-0">Upload Image</v-card-title>
      <v-btn
        tile
        depressed
        width="480"
        height="auto"
        @click="openFileDialog"
        class="transparent pa-0"
      >
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          max-width="480"
          :aspect-ratio="1.9 / 1"
          :src="avatarPath"
        >
          <input ref="uploader" @change="preview" class="d-none" type="file" accept="image/*" />
        </v-img>
      </v-btn>
    </v-card-text>
    <!-- <supplier-product-image :path="avatarPath" @on-change="avatarChanged"></supplier-product-image> -->

    <v-card-text>
      <vue-editor v-model="html"></vue-editor>
    </v-card-text>

    <input-form-action
      :invalid="false"
      :content="html"
      @on-cancel="handleCancel"
      @on-save="handleSave"
    ></input-form-action>
    <!-- <v-snackbar v-model="saved" :timeout="1000">Saved</v-snackbar> -->
  </v-card>
</template>

<script lang="ts">
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { VueEditor } from "vue2-editor";
import api from "@/api/crud";
import { get } from "lodash";

import { computed, defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "PrivacyInput",

  components: {
    // SupplierProductImage: () => import("./supplier-product-image.vue"),
    InputFormAction: () => import("@/views/widget/input-form-action.vue"),
    InputFormTitle: () => import("@/views/widget/input-form-title.vue"),
    VueEditor
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

  setup(props, { emit, root }) {
    const title = computed(() => root.$t("supplier_products.edit"));

    const selectedImage = ref(null as string);

    const src = ref(props.id);
    const saved = ref(false);
    const html = ref("");

    const remark = computed(() => {
      return JSON.parse(props.item["meta"]);
    });

    // const avatarPath = ref("https://cdn.vuetifyjs.com/images/parallax/material.jpg");
    const form = ref({
      firstName: "John",
      lastName: "Doe",
      contactEmail: "john@doe.com",
      avatar: ""
    });

    function avatarChanged(file) {
      form.value.avatar = file;
    }

    const avatarPath = computed(() => {
      const img = `${process.env.VUE_APP_API_URL}/SupplierProduct/${props.id}/Image`;

      return selectedImage.value != null ? selectedImage.value : img;
    });

    // watch(selected, (id) => {
    //   const meta = JSON.parse(props.item["meta"]);

    //   html.value = meta != null ? meta.html : "";
    // });

    function handleBackButton() {
      selectedImage.value = null;
      emit("on-input-back");
    }

    function openFileDialog() {
      //root.$refs.uploader.click();
      this.$refs.uploader.click();
    }

    function preview(e) {
      selectedImage.value = URL.createObjectURL(e.target.files[0]);
      // emit("on-change", e.target.files[0]);
    }

    function handleCancel() {
      html.value = "";
    }

    async function handleSave() {
      const contentEncoded = JSON.stringify({html: html.value});
      console.log(contentEncoded);

      const supplierProduct = {
        ...props.item,
        meta: contentEncoded
      }

      try {
        const response = await api.update(`/SupplierProduct/${src.value}`, supplierProduct);
        console.log(response);
      } catch (error) {
        // Error
      }
    }

    return {
      selectedImage,
      src,
      preview,
      avatarPath,
      avatarChanged,
      form,
      title,
      // save,
      saved,
      remark,
      html,
      openFileDialog,
      handleBackButton,
      handleCancel,
      handleSave
    };
  }
});
</script>
