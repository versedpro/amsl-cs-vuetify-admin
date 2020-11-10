<template>
  <v-container fluid>
    <v-layout column>
      <v-card>
        <v-card-title>
          Industries
          <v-spacer></v-spacer>

          <v-btn color="primary" @click="addItem" dark class="mb-2"> Add</v-btn>
          <industry-dialog
            :show="dialogEdit"
            @close="dialogEdit = false"
            :item="editedItem"
            @item-changed="(editedItem[key] = value)"
            @confirm="save"
            title="Edit"
          ></industry-dialog>
          <industry-dialog
            :show="dialogAdd"
            @close="dialogAdd = false"
            :item="editedItem"
            @item-changed="(key, value) => (editedItem[key] = value)"
            @confirm="save"
            title="Add new"
          ></industry-dialog>
          <industry-delete
            :show="dialogDelete"
            @close="dialogDelete = false"
            @confirm="deleteItemConfirm"
            title="Are you sure to delete?"
          >
          </industry-delete>
        </v-card-title>

        <br />

        <v-toolbar flat>
          <div class="text-center pt-2">
            <v-select
              class="md-1 sm-6"
              v-model="itemsPerPage"
              :items="[5, 10, 15, 20]"
              outlined
            ></v-select>
          </div>

          <v-spacer></v-spacer>
          <v-text-field v-model="search" label="Search"></v-text-field>
        </v-toolbar>

        <v-data-table
          :headers="headers"
          :items="industries"
          :page.sync="page"
          @page-count="pageCount = $event"
          :search="search"
          :items-per-page="itemsPerPage"
          class="elevation-1"
          hide-default-footer
        >
          <template #[`item.actions`]="{ item }">
            <v-btn depressed color="primary mr-2" @click="editItem(item)">
              <v-icon> mdi-pencil </v-icon>
              Edit
            </v-btn>

            <v-btn depressed color="error" @click="deleteItem(item)">
              <v-icon> mdi-delete </v-icon>
              Delete
            </v-btn>
          </template>
          <template #no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
          </template>
        </v-data-table>
        <div>
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Headers, Industries } from "@/demo/api/mock_industry_list";
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "Industry",

  components: {
    IndustryDelete: () => import("./industry-delete.vue"),
    IndustryDialog: () => import("./dialog.vue")
  },

  setup() {
    const headers = ref(Headers);
    const industries = ref(Industries);
    const search = ref("");
    const page = ref(1);
    const pageCount = ref(0);
    const itemsPerPage = ref(5);

    const dialog = false;
    const dialogDelete = ref(false);
    const dialogAdd = ref(false);
    const dialogEdit = ref(false);
    const editedIndex = -1;
    const deletedIndex = -1;
    const editedItem = {
      name: "",
      id: "",
      title: ""
    };
    const defaultItem = {
      name: "",
      id: "",
      title: ""
    };

    function editItem(item) {
      this.editedIndex = this.industries.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogEdit = true;
    }

    function addItem() {
      this.editedIndex = -1;
      this.dialogAdd = true;
    }

    function deleteItem(item) {
      this.deletedIndex = this.industries.indexOf(item);
      this.dialogDelete = true;
    }

    function deleteItemConfirm() {
      this.industries.splice(this.deletedIndex, 1);
      this.dialogDelete = false;
    }

    function close() {
      this.dialogEdit = false;
      this.dialogAdd = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    }

    function save() {
      if (this.editedIndex > -1) {
        Object.assign(this.industries[this.editedIndex], this.editedItem);
      } else {
        this.industries.push(this.editedItem);
      }
      this.close();
    }

    return {
      headers,
      industries,
      save,
      deleteItemConfirm,
      close,
      dialogAdd,
      deleteItem,
      editItem,
      defaultItem,
      itemsPerPage,
      page,
      pageCount,
      search,
      dialog,
      dialogDelete,
      deletedIndex,
      dialogEdit,
      editedIndex,
      editedItem,
      addItem
    };
  }
});
</script>
