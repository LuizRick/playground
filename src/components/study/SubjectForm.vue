<template>
  <v-container>
    <v-card flat color="purple">
      <v-card-title>
        <span class="headline">Novo</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col md="4" sm="12">
                <v-text-field
                  label="Name"
                  v-model="model.name"
                  :rules="modelValidation.nameRules"
                  clearable
                />
              </v-col>
              <v-col md="4" sm="12">
                <v-text-field
                  label="Descricao"
                  v-model="model.descricao"
                  :rules="modelValidation.descricaoRules"
                  clearable
                />
              </v-col>
              <v-col md="4" sm="12">
                <v-text-field
                  label="url curso"
                  v-model="model.url"
                  :rules="modelValidation.urlRules"
                  clearable
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" :disabled="!valid" @click="salvar">
          <v-icon left>mdi-content-save</v-icon>Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
const SET_LOADING = "setLoading";
export default {
  data() {
    return {
      valid: true,
      modelValidation: {
        nameRules: [v => !!v || "Name is required"],
        descricaoRules: [v => !!v || "descricao is required"],
        urlRules: [
          v => !!v || "url is required ",
          v => !!isValidUrl(v) || "Url invalida"
        ]
      },
      model: {
        name: "",
        descricao: "",
        url: "",
        horarios: []
      }
    };
  },
  methods: {
    async salvar() {
      if (!this.$refs.form.validate()) {
        return false;
      }
      this.$store.commit(SET_LOADING, true);
      try {
        let response = await this.$multiservice.post(
          "/save-subject",
          this.model
        );
        if (response.data.status == 200) {
          this.myAlert("salvo con sucesso");
        } else {
          this.myAlert("nao foi possivel salvar");
        }
      } catch (_) {
        this.myAlert("nao foi possivel salvar");
      } finally {
        this.$store.commit(SET_LOADING, false);
      }
    },
    myAlert(msg) {
      alert(msg);
    }
  }
};

function isValidUrl(string) {
  try {
    new URL(string);
  } catch (_) {
    return false;
  }

  return true;
}
</script>

<style>
</style>