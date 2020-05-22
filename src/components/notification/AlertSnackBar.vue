<template>
  <v-snackbar v-model="show" ref="snackbar"  :timeout="timeout">
    {{text}}
    <v-btn color="pink" text @click="hide">Fechar</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  data(){
    return {
      timeout:3000
    }
  },
  methods: {
    hide() {
      this.$emit("update:show", false);
    }
  },
  updated(){
    if(this.show == true){
      setTimeout(() => this.$emit("update:show", false), this.timeout - 50)
    }
  }
};
</script>

<style>
</style>