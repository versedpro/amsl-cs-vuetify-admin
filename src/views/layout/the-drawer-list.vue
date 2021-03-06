<template>
  <v-list :dense="dense" class="layout-drawer">
    <div v-for="item in visibleRoutes" :key="item.title">
      <v-list-item
        v-if="isVisibleItem(item)"
        :to="resolvePath(getVisibleChild(item))"
        ripple="ripple"
        active-class="primary--text gold"
      >
        <v-list-item-icon class="layout-drawer__icon">
          <v-icon>{{ getListIcon(getVisibleChild(item)) }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{ getListTitle(getVisibleChild(item)) }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-group v-else :prepend-icon="getListIcon(item)" active-class="white--text">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>
              {{ getListTitle(item) }}
            </v-list-item-title>
          </v-list-item-content>
        </template>

        <the-layout-drawer-list
          :dense="dense"
          :routes="item.children"
          :base-path="resolvePath(item)"
        />
      </v-list-group>
    </div>
  </v-list>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/composition-api";
import { resolve } from "path";

export default defineComponent({
  name: "TheLayoutDrawerList",
  props: {
    dense: Boolean,
    iconShow: Boolean,
    isNest: Boolean,
    routes: {
      type: Array,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {}
    },
    basePath: {
      type: String,
      default: ""
    }
  },

  setup(props) {
    const visibleRoutes = computed(() => {
      return props.routes.filter((route) => {
        return !route["meta"] || !route["meta"]["hidden"];
      });
    });

    function getVisibleChild(item) {
      let children = item.children || [];

      children = children.filter(({ meta }) => {
        return !meta || !meta.hidden;
      });

      if (children.length === 0) {
        return { ...item, noVisibleChildren: true };
      }

      if (children.length === 1) {
        const child = children.find(() => true);
        child.path = resolve(item.path, child.path);
        child.meta = child.meta || {};
        child.meta.icon = child.meta.icon || item.meta.icon || "";
        return child;
      }

      return false;
    }

    function isExternal(path) {
      return /^(https?:|mailto:|tel:)/.test(path);
    }

    function isVisibleItem(item) {
      const child = getVisibleChild(item);
      return child && (!child.children || child.noVisibleChildren) && !item.alwaysShow;
    }

    function resolvePath({ path }) {
      if (isExternal(path)) {
        return path;
      }
      return resolve(props.basePath, path);
    }

    function getListIcon({ meta }) {
      meta = meta || {};
      return props.iconShow && meta.icon ? meta.icon : " ";
    }

    function getListTitle({ meta }) {
      meta = meta || {};
      return meta.title ? this.$t(meta.title) : "";
    }

    return {
      visibleRoutes,
      isVisibleItem,
      resolvePath,
      getListIcon,
      getListTitle,
      getVisibleChild
    };
  }
});
</script>

<style>
.layout-drawer {
  padding-bottom: 0px;
  padding-top: 0px;
}
.layout-drawer__icon {
  margin-bottom: 8px;
  margin-top: 8px;
}
</style>
