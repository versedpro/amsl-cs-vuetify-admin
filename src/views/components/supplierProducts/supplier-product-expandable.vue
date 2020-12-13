<template>
  <v-card flat tile class="my-0 px-4" color="orange lighten-5">
    <v-card-text>
      <v-img :src="remoteSrc" lazy-src="https://picsum.photos/id/11/10/6" max-width="480"></v-img>
    </v-card-text>
    <v-card-text v-html="remark"> </v-card-text>
    <v-card-action>
      <v-flex class="text-right">
        <v-btn @click="editRemark">Edit</v-btn>
      </v-flex>
    </v-card-action>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "@vue/composition-api";
import api from "@/api/crud";

export default defineComponent({
  name: "FileUpload",

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

  setup(props, { refs, emit }) {
    const src = ref("");
    const remark = ref("gbhggh");
    const remoteSrc = ref("");
    const uploaded = ref(false);
    const invalidAspect = ref(false);
    // const window = ref(0);

    watchEffect(() => {
      remoteSrc.value = `${process.env.VUE_APP_API_URL}/SupplierProduct/${props.id}/Image`;

      // remark.value = "cvvvbv";
      const xx = JSON.parse(props.item["meta"]);

      remark.value = xx.html;
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

    function editRemark() {
      emit("on-edit-remark");
      // api.update(`/SalesOrder/${props.item.salesOrderId}`, order.value);
    }

    return {
      src,
      remark,
      upload,
      uploaded,
      remoteSrc,
      preview,
      openFileDialog,
      invalidAspect,
      editRemark
    };
  }
});
</script>
