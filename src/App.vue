<template>
  <v-app>
    <v-navigation-drawer app v-model="showDrawer">
      <v-list nav dense>
      <v-list-item-group active-class="deep-purple--text text--accent-4">
        <v-list-item to="/">
          <v-list-item-title>
            Home
          </v-list-item-title>
        </v-list-item>

        <v-list-item to="/about">
          <v-list-item-title>Sobre</v-list-item-title>
        </v-list-item>

      </v-list-item-group>
    </v-list>
    </v-navigation-drawer>
    <v-app-bar color="primary" dark app flat v-show="showAppBar">
      <v-app-bar-nav-icon @click.stop="setVisibilityDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Playground</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer v-show="showAppBar">
      Downsoft @2019
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
      get(){
        return this.$store.state.navigation.showTopBar;
      },
      set(valor){
        this.$store.commit("setShowTopbar", valor);
      }
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
