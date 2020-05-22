<template>
  <v-card>
    <v-card-title>
      <span class="headline">Grade</span>
    </v-card-title>
    <v-card-text>
      <v-data-table :headers="tableModel.headers" :items="courses" :disable-pagination="true">
        <template v-for="(v) in tableModel.headers" v-slot:[`item.${v.value}`]="{item}">
          <template v-if="item[v.value]">{{item[v.value].slice(0,20)}}</template>
          <template v-else>-</template>
        </template>
      </v-data-table>
    </v-card-text>
    <alert-snack-bar :text="snackModel.text" :show.sync="snackModel.show" />
  </v-card>
</template>

<script>
const SET_LOADING = "setLoading";
import AlertSnackBar from "@/components/notification/AlertSnackBar";
export default {
  components: {
    AlertSnackBar
  },
  data() {
    return {
      courses: [],
      tableModel: {
        headers: [
          { text: "Horarios", value: "hour" },
          { text: "segunda", value: "segunda" },
          { text: "terca", value: "terca" },
          { text: "quarta", value: "quarta" },
          { text: "quinta", value: "quinta" },
          { text: "sexta", value: "sexta" },
          { text: "sabado", value: "sabado" },
          { text: "domingo", value: "domingo" }
        ]
      },
      dias: [
        "segunda",
        "terca",
        "quarta",
        "quinta",
        "sexta",
        "sabado",
        "domingo"
      ],
      snackModel: {
        text: "",
        show: false
      }
    };
  },
  methods: {
    mountData(items) {
      let retorno = [];
      items.forEach(item => {
        let row = {};
        this.dias.forEach(dia => {
          let t = item.horarios.find(v => v.dia == dia);
          if (t) {
            row[dia] = item.descricao;
            row["hour"] = t.from + "-" + t.to;
          }
        });

        if (Object.keys(row).length > 0) {
          retorno.push(row);
        }
      });

      this.courses = retorno;
    }
  },
  async created() {
    try {
      this.$store.commit(SET_LOADING, true);
      let response = await this.$multiservice.get("/get-subjects");
      if (response.data.status != 200) throw new Error();
      this.mountData(response.data.resultado);
    } catch (error) {
      this.snackModel = {
        show: true,
        text: `Nao foi possivel carregar: ${error}`
      };
    } finally {
      this.$store.commit(SET_LOADING, false);
    }
  }
};
</script>

<style>
</style>