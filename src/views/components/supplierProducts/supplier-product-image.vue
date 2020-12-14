<template>
  <div>
    <!-- <v-btn
      fab
      depressed
      color="gold"
      @click="openFileDialog"
      class="transparent pa-0"
      width="128"
      height="128"
    > -->
    <v-card-text>
      <!-- <v-img class="white--text" :aspect-ratio="1 / 1" height="200px" :src="src">
        <input
          type="file"
          style="display: none"
          ref="uploader"
          accept="image/*"
          @change="preview"
        />
      </v-img> -->

      <v-img
        lazy-src="https://picsum.photos/id/11/10/6"
        max-width="480"
        :aspect-ratio="1.9 / 1"
        :src="src"
        @click="openFileDialog"
      >
        <input ref="uploader" @change="preview" class="d-none" type="file" accept="image/*" />
      </v-img>

      <!-- <v-file-input class="d-none" prepend-icon="" accept="image/*" label="File input">
      </v-file-input> -->

      <!-- <v-avatar size="120" class="mx-4" color="primary lighten-1">
        <img :src="src" alt="Avatar" />
      </v-avatar> -->
      <!-- <input ref="uploader" @change="preview" class="d-none" type="file" accept="image/*" /> -->
      <!-- </v-btn> -->
    </v-card-text>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "@vue/composition-api";
export default defineComponent({
  name: "Avatar",

  props: {
    path: {
      type: String,
      required: true
    }
  },

  setup(props, { emit }) {
    const x = computed(() => props.path);

    const src = ref("");

    watch(x, (a) => {
      src.value = a;
    });

    function preview(e) {
      src.value = URL.createObjectURL(e.target.files[0]);
      emit("on-change", e.target.files[0]);
    }

    function openFileDialog() {
      //root.$refs.uploader.click();
      this.$refs.uploader.click();
    }

    //  function openFileDialog() {
    //   this.$refs.uploader.click();
    // }

    function handleClick() {
      openFileDialog();
    }

    return {
      x,
      src,
      preview,
      handleClick,
      openFileDialog
    };
  }
});
</script>
