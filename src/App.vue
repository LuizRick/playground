<template>
  <v-app>
    <v-navigation-drawer app v-model="showDrawer" dark>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item to="/">
            <v-list-item-title>
              <v-icon color="blue">mdi-home</v-icon>Inicio
            </v-list-item-title>
          </v-list-item>

          <v-list-item to="/youtube/download">
            <v-list-item-title>
              <v-icon color="blue">mdi-download</v-icon>Baixar youtube
            </v-list-item-title>
          </v-list-item>
          <v-list-item to="/mangaslivre/search">
            <v-list-item-title>
              <v-icon color="blue">mdi-card-search-outline</v-icon>Buscar mangas
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="dark" dark app flat v-show="showAppBar">
      <v-app-bar-nav-icon @click.stop="setVisibilityDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Playground</v-toolbar-title>
      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        bottom
        color="deep-purple accent-4"
      ></v-progress-linear>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer v-show="showAppBar">
      <span title=" Downsoft @2019">Downsoft @2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  computed: {
    showDrawer: {
      get() {
        return this.$store.state.navigation.showDrawer;
      },
      set(valor) {
        this.$store.commit("setDrawer", valor);
      }
    },
    showAppBar: {
      get() {
        return this.$store.state.navigation.showTopBar;
      },
      set(valor) {
        this.$store.commit("setShowTopbar", valor);
      }
    },
    loading() {
      return this.$store.state.navigation.loading;
    }
  },
  methods: {
    setVisibilityDrawer() {
      this.$store.commit("setDrawer", !this.$store.state.navigation.showDrawer);
    }
  }
};
</script>

<style lang="scss">
</style>
