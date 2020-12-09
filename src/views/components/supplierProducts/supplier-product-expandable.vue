<template>
  <v-card flat tile class="my-0 px-4" color="orange lighten-5">
    <v-card-title>test</v-card-title>
    <v-card-actions>
      <v-flex>
        <v-btn @click="openFileDialog" height="fit-content" width="fit-content" class="pa-0">
          <!-- added two img tags because browser is not letting  -->
          <!-- change the image src across domains -->
          <v-img
            v-if="!uploaded"
            :src="remoteSrc"
            lazy-src="https://picsum.photos/id/11/10/6"
            max-width="250"
          ></v-img>

          <v-img
            v-else
            lazy-src="https://picsum.photos/id/11/10/6"
            max-width="250"
            :src="src"
          ></v-img>
          <input ref="uploader" @change="preview" class="d-none" type="file" accept="image/*" />
        </v-btn>
        <div>
          <p class="pt-2 red--text" v-if="invalidAspect">Aspect ratio is not correct</p>
        </div>
        <v-btn class="align-self-center mt-4" @click="upload" :disabled="invalidAspect">
          Upload
        </v-btn>
      </v-flex>
      <v-spacer></v-spacer>
      <v-text-field label="Remarks"></v-text-field>
    </v-card-actions>
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
