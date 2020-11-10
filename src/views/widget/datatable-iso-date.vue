<template>
  <div>{{ isoDate }}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "DatatableIsoDate",

  props: {
    value: {
      type: String,
      default: "N/A"
    }
  },
  setup(props) {
    const isoDate = ref(props.value);

    return {
      isoDate
    };
  }
});
</script>
