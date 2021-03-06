<template>
  <v-timeline
    align-top
    dense
    clipped
    :style="{ 'padding-bottom': $vuetify.breakpoint.xsOnly ? '154px' : '82px' }"
  >
    <v-timeline-item
      v-for="event in timeline"
      :key="event.id"
      :class="event.itemClass"
      :color="event.color"
      small
    >
      <div v-text="event.time"></div>
      <v-card elevation="6" class="mt-2 rounded-lg">
        <v-card-text class="white text--primary">
          {{ event.name }}
          <p>
            <v-chip :class="event.commentClass" v-text="event.text"> </v-chip>
          </p>
        </v-card-text>
      </v-card>
    </v-timeline-item>
    <v-timeline-item
      fill-dot
      class="primary--text text-center pt-1 pb-0 comment"
      color="gold"
      large
      :class="{ isMobile: $vuetify.breakpoint.xsOnly }"
      v-if="isReadOnly"
    >
      <template v-slot:icon>
        <span>JL</span>
      </template>
      <v-text-field
        v-model="input"
        class="mr-12"
        label="Type a message..."
        append-outer-icon="mdi-send"
        flat
        rounded
        solo
        clearable
        background-color="grey"
        @click:append-outer="comment"
        @keydown.enter="comment"
      >
      </v-text-field>
    </v-timeline-item>
  </v-timeline>
</template>
<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "@vue/composition-api";
import * as signalR from "@aspnet/signalr";
import api from "@/api/crud";
import moment from "moment";
// import store from "@/store/index";
import Axios from "axios";

export default defineComponent({
  name: "OrdersChat",

  props: {
    orderId: Number,
    referloId: Number,
    isActive: Boolean
  },

  setup(props) {
    const events = ref([]);
    const input = ref("");
    const nonce = ref(0);
    const referlo = ref("");
    const isReadOnly = computed(function () {
      return props.isActive;
    });
    const timeline = computed(function () {
      return events.value; //.slice().reverse();
    });

    const connection = ref(
      new signalR.HubConnectionBuilder()
        .withUrl(`${process.env.VUE_APP_API_URL}/chathub?orderId=${props.orderId.toString()}`)
        .build()
    );
    onMounted(() => {
      connection.value
        .start()
        .then()
        .catch((error) => {
          console.log(error);
        });
      getReferloName();
      getMessages();
      connection.value.on(
        "ReceiveMessage",
        (operatorName: string, message: string, time: string) => {
          events.value.push({
            id: nonce.value++,
            name: referlo.value,
            text: message,
            color: "primary",
            itemClass: "mb-4 mr-12",
            commentClass: "mt-2 primary",
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            time: moment(time).format("MM/DD/YYYY hh:mm:ss")
          });
        }
      );
    });

    async function getReferloName() {
      await Axios({
        url: `/referlo/${parseInt(props.referloId.toString())}`,
        method: "GET"
      }).then((response) => {
        let refInfo = response["data"];
        referlo.value = refInfo["referloAlias"];
      });
    }

    function addEvent(message) {
      if (message.operatorName === "") {
        events.value.push({
          id: nonce.value++,
          name: referlo.value,
          text: message.text,
          color: "primary",
          itemClass: "mb-4 mr-12",
          commentClass: "mt-2 primary",
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          time: moment(message.date).format("MM/DD/YYYY hh:mm:ss")
        });
      } else {
        events.value.push({
          id: nonce.value++,
          name: message.operatorName,
          text: message.text,
          color: "gold",
          itemClass: "mr-12",
          commentClass: "mt-2 gold",
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          time: moment(message.date).format("MM/DD/YYYY hh:mm:ss")
        });
      }
    }

    function addEvents(messages) {
      for (let i = 0; i < messages.length; i++) {
        addEvent(messages[i]);
      }
    }

    function getMessages() {
      api.get("/SalesChat/GetComments/" + props.orderId).then(({ data: messages }) => {
        events.value = [];
        addEvents(messages);
      });
    }

    function comment() {
      const text = input.value;
      if (connection.value.state === signalR.HubConnectionState.Connected) {
        connection.value.invoke("SendAnswer", this.$store.getters.user, props.orderId, text);
        input.value = null;
      } else {
        connection.value
          .start()
          .then(() =>
            connection.value.invoke("SendAnswer", this.$store.getters.user, props.orderId, text)
          );
        input.value = null;
      }
      events.value.push({
        id: nonce.value++,
        name: this.$store.getters.user,
        text: text,
        color: "gold",
        itemClass: "mr-12",
        commentClass: "mt-2 gold",
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        time: moment(new Date().toString()).format("MM/DD/YYYY hh:mm:ss")
      });
    }

    return {
      input,
      comment,
      referlo,
      timeline,
      isReadOnly
    };
  }
});
</script>

<style scoped>
.comment {
  position: fixed;
  bottom: 0;
  z-index: 3;
  background-color: #eaeaea;
  width: 102.5vh;
}
.isMobile {
  width: 100% !important;
  padding-bottom: 72px !important;
}
</style>
