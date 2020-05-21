<template>
  <v-card flat>
    <v-card-title>
      <span class="headline">Listagem</span>
    </v-card-title>
    <v-card-text>
      <v-data-table :headers="table.headers" :items="table.items">
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="addHour(item)">mdi-table-clock</v-icon>
        </template>
        <template v-slot:item.url="{item}">
          <v-btn icon :href="item.url" target="_blank">
            <v-icon>mdi-launch</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="listar">listar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
const SET_LOADING = "setLoading";
export default {
  data() {
    return {
      table: {
        headers: [
          { text: "Nome ", value: "name" },
          { text: "Descricao ", value: "descricao" },
          { text: "URL ", value: "url" },
          { text: "Actions", value: "actions", sortable: false }
        ],
        items: []
      }
    };
  },
  methods: {
    async listar() {
      try {
        this.$store.commit(SET_LOADING, true);
        let response = await this.$multiservice.get("/get-subjects");
        if (response.status === 200) {
          this.table.items = response.data.resultado;
        } else {
          alert("nao foi possivel carregar");
        }
      } finally {
        this.$store.commit(SET_LOADING, false);
      }
    },
    addHour(item) {
      this.$emit("hour", item);
    }
  }
};
</script>

<style>
</style>