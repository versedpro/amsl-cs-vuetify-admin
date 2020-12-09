<template>
  <v-card flat tile>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field label="First Name" v-model="user.firstName"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field label="Last Name" v-model="user.lastName"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field label="Alias" v-model="user.staffAlias"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field label="Role" v-model="user.roleCode"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select :items="statuses" v-model="user.statusFlag" label="Status"></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-btn class="align-self-center" @click="save">Save</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "@vue/composition-api";
import api from "@/api/crud";

export default defineComponent({
  name: "ExpandedDataTable",

  props: {
    item: Object
  },

  setup(props) {
    const statuses = [
      { value: 0, text: "submit" },
      { value: 1, text: "sale assign" },
      { value: 2, text: "completed" }
    ];
    const user = ref(props.item);
    watchEffect(() => {
      user.value = props.item;
    });

    function save() {
      api.update(`/Staff/${props.item.staffId}`, user.value);
    }

    return {
      user,
      save,
      statuses
    };
  }
});
</script>
