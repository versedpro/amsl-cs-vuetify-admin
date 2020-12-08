<template>
  <div>
    <div class="d-flex pa-5" width="100%">
      <v-btn @click="openFileDialog" width="128" height="128">
        <v-avatar tile size="120" class="mx-4" color="primary lighten-1">
          <!-- unable to update the src, so used to images -->
          <img :src="remoteSrc" v-if="!uploaded" alt="Avatar" />
          <img :src="src" v-else alt="Avatar" />
        </v-avatar>
        <input ref="uploader" @change="preview" class="d-none" type="file" accept="image/*" />
      </v-btn>
      <v-btn class="align-self-center ml-4" @click="upload" :disabled="invalidAspect">Upload</v-btn>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="6" md="4" class="d-flex align-center">
        <v-text-field label="Remarks"></v-text-field>
      </v-col>
    </div>
    <div class="justify-center text-center">
      <p class="pt-2 red--text" v-if="invalidAspect">Aspect ratio is not correct</p>
    </div>
  </div>
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
    const remoteSrc = ref("");
    const uploaded = ref(false);
    const invalidAspect = ref(false);
    watchEffect(() => {
      remoteSrc.value = `https://referlo.azurewebsites.net/SupplierProduct/${props.id}/Image`;
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
