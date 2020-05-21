<template>
  <v-menu
    ref="menu"
    v-model="menu2"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="time"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        slot="activator"
        v-model="time"
        :label="label"
        prepend-icon="mdi-clock-time-four-outline"
        readonly
        v-on="on"
        :rules="rules"
      ></v-text-field>
    </template>
    <v-time-picker v-if="menu2" v-model="time" full-width @click:minute="changeTime(time)"></v-time-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    label: {
      required: true,
      type: String
    },
    timer: {
      type: String
    },
    rules: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  model: {
    prop: "time",
    event: "change"
  },
  data() {
    return {
      time: null,
      menu2: false
    };
  },
  methods: {
    changeTime(value) {
      this.$emit("change", value);
      this.$refs.menu.save(this.time);
    }
  }
};
</script>

<style>
</style>