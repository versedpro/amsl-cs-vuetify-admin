<template>
  <v-container fluid fill-height justify-end class="pa-0 ma-0 home-background">
    <v-card class="mr-12 pt-12 px-8" tile width="650px" height="100vh">
      <v-card flat tile>
        <v-card-text class="pt-8 layout column align-center">
          <img :src="imageSource" alt="Referlo Logo" width="120" height="120" />
        </v-card-text>

        <v-card-title class="justify-center">{{ $t("login.appTitle") }}</v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field
              v-model="model.phone"
              append-icon="mdi-phone"
              name="email"
              :label="$t('login.phone')"
              type="email"
              required
              autocomplete="username"
            />
            <v-text-field
              v-model="model.password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :label="$t('login.password')"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              name="password"
              required
              autocomplete="current-password"
            />
          </v-form>
        </v-card-text>
        <v-card-text> </v-card-text>
        <v-card-actions>
          <localization />

          <v-spacer />
          <v-btn class="px-4" color="primary" rounded outlined to="/register">
            {{ $t("login.register") }}
          </v-btn>
          <v-btn class="px-4" color="primary" rounded :loading="loading" @click="login">
            {{ $t("login.login") }}
          </v-btn>
        </v-card-actions>
      </v-card>

      <the-footer />
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { userAdmin } from "@/api/mock";
import { defineComponent, reactive, ref } from "@vue/composition-api";

export default defineComponent({
  components: {
    Localization: () => import("@/views/widget/app-localization.vue"),
    TheFooter: () => import("@/views/layout/the-footer.vue")
  },

  setup() {
    const model = reactive({
      phone: userAdmin.phone,
      password: userAdmin.password
    });

    const loading = ref(false);
    const showPassword = ref(false);
    const imageSource = ref("img/icons/icon-1024x1024.png");

    async function login() {
      // $store
      await this.$store.dispatch("LoginByPhone", {
        phone: model.phone,
        password: model.password
      });
      await this.$router.push(this.$route.query.redirect || "/");
    }

    return {
      model,
      loading,
      imageSource,
      showPassword,
      login
    };
  }
});
</script>

<style scoped>
/* html {
  overflow-y: auto;
} */

.home-background {
  background: url("~@/assets/img/amsl_background.png");
  background-size: cover;
  width: 100%;
  height: 100%;
  background-position: center center;
}
</style>
