<template>
  <v-container>
    <v-card flat color="purple">
      <v-card-title>
        <span class="headline">Novo</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="modelValidation.valid">
          <v-container>
            <v-row>
              <v-col md="4" sm="12">
                <v-text-field label="Name" readonly v-model="subject.name" />
              </v-col>
              <v-col md="4" sm="12">
                <v-text-field
                  label="year"
                  v-model="model.year"
                  type="number"
                  :rules="modelValidation.yearRules"
                />
              </v-col>
              <v-col md="4" sm="12">
                <v-select
                  label="Dia"
                  :items="dias"
                  v-model="model.dia"
                  :rules="modelValidation.dayRules"
                />
              </v-col>
              <v-col md="4" sm="12">
                <timer-form
                  label="inicio"
                  v-model="model.from"
                  :rules="modelValidation.hourInicioRules"
                />
              </v-col>
              <v-col md="4" sm="12">
                <timer-form
                  label="final"
                  v-model="model.to"
                  :rules="modelValidation.hourFinalRules"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" :disabled="!modelValidation.valid" @click="salvar">
          <v-icon left>mdi-content-save</v-icon>Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
const SET_LOADING = "setLoading";
import TimerForm from "@/components/study/TimerForm";
export default {
  components: { TimerForm },
  props: {
    subject: {
      type: Object
    }
  },
  model: {
    prop: "subject",
    event: "change"
  },
  data() {
    return {
      model: {
        from: null,
        to: false,
        year: "",
        dia: ""
      },
      modelValidation: {
        yearRules: [v => !!v || "Year is required"],
        dayRules: [v => !!v || "Day is required"],
        hourInicioRules: [v => !!v || "Hora inicio is required"],
        hourFinalRules: [v => !!v || "Hora final is required"],
        valid: true
      },
      dias: [
        "segunda",
        "terca",
        "quarta",
        "quinta",
        "sexta",
        "sabado",
        "domingo"
      ]
    };
  },
  methods: {
    async salvar() {
      if (!this.$refs.form.validate()) {
        return false;
      }

      try {
        this.$store.commit(SET_LOADING, true);
        this.subject.horarios.push(this.model);
        let res = await this.$multiservice.post(
          "/update-subject",
          this.subject
        );
      } catch (_) {
        alert("nao foi possivel salvar");
      } finally {
        this.$store.commit(SET_LOADING, false);
      }
    }
  }
};
</script>

<style>
</style>