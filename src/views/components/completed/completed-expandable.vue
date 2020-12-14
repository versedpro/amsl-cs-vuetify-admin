<template>
  <v-card flat tile class="grey lighten-3">
    <v-card-text class="pt-0 mt-0">
      <v-container>
        <v-row>
          <v-card width="50%" class="mx-auto">
            <v-col cols="12">
              <v-tooltip right color="gold primary--text">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon color="primary" v-bind="attrs" v-on="on" size="48px"
                    >mdi-account-box-multiple-outline</v-icon
                  >
                </template>
                <span>ID's</span>
              </v-tooltip>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <span>Sales Order Id</span>
              <h4 class="font-weight-black primary--text">{{ item.salesOrderId }}</h4>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <span>Referlo Id</span>
              <h4 class="font-weight-black primary--text">{{ item.referloId }}</h4>
            </v-col>
          </v-card>
          <v-card width="100%" class="mx-auto">
            <v-col cols="12">
              <v-tooltip right color="gold primary--text">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon color="primary" v-bind="attrs" v-on="on" size="48px"
                    >mdi-card-account-phone-outline</v-icon
                  >
                </template>
                <span>Contact Detail</span>
              </v-tooltip>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <span>Contact Name</span>
              <h4 class="font-weight-black primary--text">{{ item.contactName }}</h4>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <span>Contact Phone</span>
              <h4 class="font-weight-black primary--text">{{ item.contactPhone }}</h4>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <span>Contact Email</span>
              <h4 class="font-weight-black primary--text">{{ item.contactEmail }}</h4>
            </v-col>
          </v-card>
          <v-flex xs12 class="my-3">
            <v-divider></v-divider>
          </v-flex>
          <v-col cols="12">
            <v-tooltip right color="gold primary--text">
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" v-bind="attrs" v-on="on" size="48px"
                  >mdi-truck-fast-outline</v-icon
                >
              </template>
              <span>Supplier Detail</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <span>Supplier Product Id</span>
            <h4 class="font-weight-black primary--text">{{ item.supplierProductId }}</h4>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <span>Supplier Sales Admin</span>
            <h4 class="font-weight-black primary--text">{{ item.supplierSalesAdmin }}</h4>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <span>Supplier Sales Time</span>
            <h4 class="font-weight-black primary--text">{{ item.supplierSalesAppointedTime }}</h4>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <span>Supplier Sales Id</span>
            <h4 class="font-weight-black primary--text">{{ item.supplierSalesId }}</h4>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <span>Supplier Other Info</span>
            <h4 class="font-weight-black primary--text">{{ item.supplierOtherInfo }}</h4>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <span>Sales Order Timestamp</span>
            <h4 class="font-weight-black primary--text">{{ item.salesOrderProcessTimestamp }}</h4>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <span>Created Timestamp</span>
            <h4 class="font-weight-black primary--text">{{ item.createdTimestamp }}</h4>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <span>Status Flag</span>
            <h4 class="font-weight-black primary--text">{{ item.statusFlag }}</h4>
          </v-col>
          <v-flex xs12 class="my-3">
            <v-divider></v-divider>
          </v-flex>
          <v-col cols="12">
            <v-tooltip right color="gold primary--text">
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" v-bind="attrs" v-on="on" size="48px">mdi-database</v-icon>
              </template>
              <span>Points Detail</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <span>Points Level 1 %</span>
            <h4 class="font-weight-black primary--text">{{ item.pointsLevel0 }}</h4>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <span>Points Level 2 %</span>
            <h4 class="font-weight-black primary--text">{{ item.pointsLevel1 }}</h4>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <span>Points Level 3 %</span>
            <h4 class="font-weight-black primary--text">{{ item.pointsLevel2 }}</h4>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <span>Final Points</span>
            <h4 class="font-weight-black primary--text">
              {{ item.pointsFinal }}
            </h4>
          </v-col>

          <!-- <v-list class="pa-0">
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
          </v-list> -->
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import api from "@/api/crud";

export default defineComponent({
  name: "ExpandedDataTable",

  props: {
    item: Object,
    staff: Array
  },

  setup(props) {
    const staffId = ref(0);

    function save() {
      const data = {
        ...props.item,
        supplierSalesId: staffId.value
      };
      api.update(`/SalesOrder/${props.item.salesOrderId}`, data);
    }

    return {
      staffId,
      save
    };
  }
});
</script>
