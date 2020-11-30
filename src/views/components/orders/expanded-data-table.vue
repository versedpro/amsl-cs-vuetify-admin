<template>
  <v-container grid-list-lg class="my-5">
    <v-layout wrap>
      <v-flex xs12>
        <h4 class="overline font-weight-bold">License plate</h4>
        <h2>VM5527</h2>
      </v-flex>
      <v-flex xs12 class="my-3">
        <v-divider></v-divider>
      </v-flex>
      <v-flex xs2>
        <h4 class="overline font-weight-bold">Bus factory</h4>
        <p class="body-1">Kowloon Bay</p>
      </v-flex>
      <v-flex xs2>
        <h4 class="overline font-weight-bold">Receiving plant</h4>
        <p class="body-1">Lai Chi Kok</p>
      </v-flex>
      <v-flex xs2>
        <h4 class="overline font-weight-bold">Receiving time</h4>
        <p class="body-1">2018-10-23 04:44</p>
      </v-flex>
      <v-flex xs2>
        <h4 class="overline font-weight-bold">Receiver</h4>
        <p class="body-1">156</p>
      </v-flex>
      <v-flex xs2>
        <h4 class="overline font-weight-bold">report time</h4>
        <p class="body-1">2018-10-23 04:29</p>
      </v-flex>
      <v-flex xs2>
        <h4 class="overline font-weight-bold">status</h4>
        <p class="body-1 font-weight-bold primary--text">Repair completed</p>
      </v-flex>
      <v-flex xs2>
        <h4 class="overline font-weight-bold">Report car captain</h4>
        <p class="body-1">955</p>
      </v-flex>
      <v-flex xs2>
        <h4 class="overline font-weight-bold">Designated captain</h4>
        <p class="body-1">600001</p>
      </v-flex>
      <v-flex xs2>
        <h4 class="overline font-weight-bold">Delivery car captain</h4>
        <p class="body-1">600002</p>
      </v-flex>
      <v-flex xs2>
        <h4 class="overline font-weight-bold">Delivery time</h4>
        <p class="body-1">2018-10-23 04:42</p>
      </v-flex>
      <v-flex xs12 class="my-3">
        <v-divider></v-divider>
      </v-flex>
      <v-flex xs4>
        <h4 class="overline font-weight-bold">Damage details</h4>
        <v-textarea filled shaped
          >波箱: 轉波遲 軚: 行車軚走左 車身: 滅火筒 車箱潔淨: 地台</v-textarea
        >
      </v-flex>
      <v-flex xs4>
        <h4 class="overline font-weight-bold">Remarks</h4>
        <v-textarea filled shaped>Strange noise</v-textarea>
      </v-flex>
      <v-flex xs4>
        <h4 class="overline font-weight-bold">Instruction message</h4>
        <v-textarea filled shaped>park at 3/F</v-textarea>
      </v-flex>
      <v-flex xs12 class="my-3">
        <v-divider></v-divider>
      </v-flex>
      <v-flex xs12>
        <h4 class="overline font-weight-bold">images</h4>
        <v-layout>
          <v-flex xs1>
            <v-img src="https://dummyimage.com/" aspect-ratio="1" class="grey lighten-2"></v-img>
          </v-flex>
          <v-flex xs1>
            <v-img src="https://dummyimage.com/" aspect-ratio="1" class="grey lighten-2"></v-img>
          </v-flex>
          <v-flex xs1>
            <v-img src="https://dummyimage.com/" aspect-ratio="1" class="grey lighten-2"></v-img>
          </v-flex>
          <v-flex xs1>
            <v-img src="https://dummyimage.com/" aspect-ratio="1" class="grey lighten-2"></v-img>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 class="my-3">
        <v-divider></v-divider>
      </v-flex>
      <v-flex xs2>
        <h4 class="overline font-weight-bold">Repair completion time</h4>
        <p class="body-1">2018-10-23 04:45</p>
      </v-flex>
      <v-flex xs2>
        <h4 class="overline font-weight-bold">Processing person</h4>
        <p class="body-1">156</p>
      </v-flex>
    </v-layout>
    <repair-status-btn-group></repair-status-btn-group>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "ExpandedDataTable",

  components: {
    RepairStatusBtnGroup: () => import("./repair-status-btn-group.vue")
  }
  // setup() {
  //   const industries = ref(Industries);
  //   return {
  //     industries
  //   };
  // }
});

// @Component({
//   components: {
//     RepairStatusBtnGroup: () => import("@/components/button/repair-status-btn-group.vue")
//   }
// })
// export default class ExpandedDataTable extends Vue {}
</script>

<style scoped>
.theme--light.v-data-table
  tbody
  tr:hover:not(.v-data-table__expand-row):not(.v-data-table__empty-wrapper) {
  background: rgba(255, 255, 255, 0.7) !important;
}
</style>
