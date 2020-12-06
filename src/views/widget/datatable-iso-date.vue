<template>
  <span>{{ isoDate() }}</span>
</template>

<script lang="ts">
import moment from "moment";

import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "DatatableIsoDate",

  props: {
    value: {
      type: String,
      default: "N/A"
    }
  },
  setup(props) {
    const format = "YYYY-MM-DD hh:mm";

    function isoDate() {
      let date = moment(props.value);
      if (date.isValid()) {
        return moment(this.dateStr).format(format);
      } else {
        return "";
      }
    }

    return {
      isoDate
    };
  }
});
</script>
