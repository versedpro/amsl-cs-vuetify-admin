<template>
  <v-card flat tile class="my-0 px-4" color="orange lighten-5">
    <v-card-text>
      <v-img :src="remoteSrc" lazy-src="https://picsum.photos/id/11/10/6" max-width="480"></v-img>
    </v-card-text>

    <v-card-text v-html="remark"> </v-card-text>

    <!-- <v-card-action>
      <v-btn @click="editRemark">Edit</v-btn>
    </v-card-action> -->

    <v-card-actions>
      <v-btn @click="editRemark">Edit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "@vue/composition-api";
// import api from "@/api/crud";

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
    const src = ref("");

    const uploaded = ref(false);
    const invalidAspect = ref(false);

    const remoteSrc = computed(() => {
      return `${process.env.VUE_APP_API_URL}/SupplierProduct/${props.id}/Image`;
    });

    const remark = computed(() => {
      return JSON.parse(props.item["meta"]);
    });

    function editRemark() {
      emit("on-edit-remark", props.item);
    }

    return {
      src,
      remark,

      uploaded,
      remoteSrc,

      invalidAspect,
      editRemark
    };
  }
});
</script>
