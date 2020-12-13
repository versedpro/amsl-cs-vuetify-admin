<template>
  <v-card flat tile>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field label="Points Level 0" v-model="order.pointsLevel0"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field label="Points Level 1" v-model="order.pointsLevel1"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field label="Points Level 2" v-model="order.pointsLevel2"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field label="Final Points" v-model="order.pointsFinal"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select
            :items="staff"
            v-model="order.supplierSalesId"
            item-text="staffAlias"
            item-value="staffId"
            label="supplierSalesId"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select
            :items="staff"
            v-model="order.supplierSalesAdmin"
            item-text="staffAlias"
            item-value="staffId"
            label="supplierSalesAdmin"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select :items="statuses" v-model="order.statusFlag" label="Status"></v-select>
        </v-col>
      </v-row>
      <!-- <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-btn class="align-self-center" @click="save">Save</v-btn>
          <v-btn class="align-self-center" @click="save">Save</v-btn>
        </v-col>
      </v-row> -->
    </v-container>

    <v-card-action>
      <v-btn class="align-self-center" @click="save">Save</v-btn>
      <v-spacer></v-spacer>
      <v-btn class="align-self-center" @click="chat">Chat</v-btn>
    </v-card-action>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "@vue/composition-api";
import api from "@/api/crud";

export default defineComponent({
  name: "ExpandedDataTable",

  props: {
    item: Object,
    staff: Array
  },

  setup(props) {
    const statuses = [
      { value: 0, text: "submit" },
      { value: 1, text: "sale assign" },
      { value: 2, text: "completed" }
    ];
    const order = ref(props.item);
    watchEffect(() => {
      order.value = props.item;
    });

    function save() {
      api.update(`/SalesOrder/${props.item.salesOrderId}`, order.value);
    }

    return {
      order,
      save,
      statuses
    };
  }
});
</script>
