<template>
  <v-card flat tile class="my-0 px-4" color="orange lighten-5">
    <v-card-text>
      <v-img :src="imgSource" lazy-src="https://picsum.photos/id/11/10/6" max-width="480"></v-img>
    </v-card-text>

    <v-card-text v-html="remark"> </v-card-text>

    <v-card-actions>
      <v-btn @click="editRemark">Edit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/composition-api";

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

  setup(props, { emit }) {
    const imgSource = computed(() => {
      return `${process.env.VUE_APP_API_URL}/SupplierProduct/${props.id}/Image`;
    });

    const remark = computed(() => {
      return JSON.parse(props.item["meta"]);
    });

    function editRemark() {
      emit("on-edit-remark", props.item);
    }

    return {
      editRemark,
      imgSource,
      remark
    };
  }
});
</script>
