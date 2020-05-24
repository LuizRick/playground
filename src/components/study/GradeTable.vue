<template>
  <v-card>
    <v-card-title>
      <span class="headline">Grade</span>
    </v-card-title>
    <v-card-text>
      <v-data-table :headers="tableModel.headers" :items="courses" :disable-pagination="true">
        <template v-for="(v) in tableModel.headers" v-slot:[`item.${v.value}`]="{item}">
          <template v-if="item[v.value]">{{item[v.value].name}}</template>
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
      let withDays = items.filter( item => item.horarios.some( hr => this.dias.indexOf(hr.dia) != -1));
      let rows = [];

      withDays.forEach( item => {
        rows.push(
          {
            'hour': getHourByDay(item),
            'segunda': getItemByDay(item, 'segunda'),
            'terca': getItemByDay(item, 'terca'),
            'quarta': getItemByDay(item, 'quarta'),
            'quinta': getItemByDay(item, 'quinta'),
            'sexta': getItemByDay(item, 'sexta'),
            'sabado': getItemByDay(item, 'sabado'),
            'domingo': getItemByDay(item, 'domingo'),
          }
        );
      });
      console.log(rows);
      this.courses = rows;
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


function getItemByDay(item, day){
  if(item.horarios.some( hr => hr.dia == day)){
    return item;
  }
  return null;
}

function getHourByDay(item, day){
  return {
    name: item.horarios[0].from  + "-" + item.horarios[0].to
  };
}
</script>

<style>
</style>