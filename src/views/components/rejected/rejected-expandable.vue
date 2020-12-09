<template>
  <v-card flat tile class="orange lighten-5">
    <v-card-text class="pt-0 mt-0">
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <h2 class="overline font-weight-black">Sales Order Id</h2>
            <h4 class="font-weight-light">{{ item.salesOrderId }}</h4>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <h2 class="overline font-weight-black">Referlo Id</h2>
            <h4 class="font-weight-light">{{ item.referloId }}</h4>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <h2 class="overline font-weight-black">Contact Name</h2>
            <h4 class="font-weight-light">{{ item.contactName }}</h4>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <h2 class="overline font-weight-black">Contact Phone</h2>
            <h4 class="font-weight-light">{{ item.contactPhone }}</h4>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <h2 class="overline font-weight-black">Contact Email</h2>
            <h4 class="font-weight-light">{{ item.contactEmail }}</h4>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <h2 class="overline font-weight-black">Contact Other Info</h2>
            <h4 class="font-weight-light">{{ item.contactOtherInfo }}</h4>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <h2 class="overline font-weight-black">Supplier Product Id</h2>
            <h4 class="font-weight-light">{{ item.supplierProductId }}</h4>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <h2 class="overline font-weight-black">Supplier Sales Admin</h2>
            <h4 class="font-weight-light">{{ item.supplierSalesAdmin }}</h4>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <h2 class="overline font-weight-black">Supplier Sales Appointed Time</h2>
            <h4 class="font-weight-light">{{ item.supplierSalesAppointedTime }}</h4>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <h2 class="overline font-weight-black">Supplier Sales Id</h2>
            <h4 class="font-weight-light">{{ item.supplierSalesId }}</h4>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <h2 class="overline font-weight-black">Supplier Other Info</h2>
            <h4 class="font-weight-light">{{ item.supplierOtherInfo }}</h4>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <h2 class="overline font-weight-black">Sales Order Process Timestamp</h2>
            <h4 class="font-weight-light">{{ item.salesOrderProcessTimestamp }}</h4>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <h2 class="overline font-weight-black">Created Timestamp</h2>
            <h4 class="font-weight-light">{{ item.createdTimestamp }}</h4>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <h2 class="overline font-weight-black">Status Flag</h2>
            <h4 class="font-weight-light">{{ item.statusFlag }}</h4>
          </v-col>

          <v-list>
            <v-list-group>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>Points</v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ item.pointsLevel0 }}</v-list-item-title>
                  <v-list-item-title>{{ item.pointsLevel1 }}</v-list-item-title>
                  <v-list-item-title>{{ item.pointsLevel2 }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
// import api from "@/api/crud";

export default defineComponent({
  name: "RejectedExpandable",

  props: {
    item: {
      type: Object,
      required: true
    }
  }

  // setup(props) {
  //   const point0 = props.item["pointsLevel0 "];
  //   const point1 = props.item["pointsLevel0 "];
  //   const point2 = props.item["pointsLevel0 "];

  //   const points = computed(() => "POINTS: " + "point0" + "point1" + "point2");

  //   return {
  //     points
  //   };
  // }
});
</script>
