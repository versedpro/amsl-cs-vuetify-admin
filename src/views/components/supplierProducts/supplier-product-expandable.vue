<template>
  <v-card flat tile class="my-0 px-4" color="orange lighten-5">
    <v-card-text>
      <v-img :src="remoteSrc" lazy-src="https://picsum.photos/id/11/10/6" max-width="480"></v-img>
    </v-card-text>
    <v-card-text v-html="remark"> </v-card-text>
    <v-card-action> </v-card-action>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "@vue/composition-api";
import api from "@/api/crud";

export default defineComponent({
  name: "FileUpload",

  props: {
    id: {
      type: Number,
      required: true
    }
  },

  setup(props, { refs }) {
    const src = ref("");
    const remark = ref("");
    const remoteSrc = ref("");
    const uploaded = ref(false);
    const invalidAspect = ref(false);

    watchEffect(() => {
      remoteSrc.value = `${process.env.VUE_APP_API_URL}/SupplierProduct/${props.id}/Image`;
    });

    function preview(e) {
      src.value = URL.createObjectURL(e.target.files[0]);
      uploaded.value = true;

      const reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (evt) => {
        let img = new Image();
        img.onload = () => {
          const aspectRatio = (img.width / img.height).toFixed(1);
          invalidAspect.value = aspectRatio !== "1.9";
        };
        img.src = evt.target.result as string;
      };
    }

    function openFileDialog() {
      const uploader = refs.uploader as HTMLInputElement;
      uploader.click();
    }

    function upload() {
      const uploader = refs.uploader as HTMLInputElement;
      const image = uploader.files[0];

      if (!image || !invalidAspect) {
        return false;
      }
      const data = new FormData();
      data.append("image", image);
      api.create(`/SupplierProduct/${props.id}/Image`, data);
    }

    return {
      src,
      remark,
      upload,
      uploaded,
      remoteSrc,
      preview,
      openFileDialog,
      invalidAspect
    };
  }
});
</script>
