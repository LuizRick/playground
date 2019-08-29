<template>
  <v-container fluid>
    <v-form v-model="valid">
      <v-container grid-list-xl>
        <v-layout wrap>
          <v-flex xs12 md12>
            <v-text-field
              v-model="mangaName"
              label="Titulo"
              :rules="mangaNameRules"
              @keydown.prevent.enter="searchManga"
            />
          </v-flex>
          <v-flex xs12 md12>
            <v-btn color="primary" @click.stop="searchManga" :disabled="!valid">
              <v-icon left>mdi-magnify</v-icon>Procurar
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
    <v-container grid-list-xl>
      <v-layout wrap>
        <v-flex md4 v-for="manga in mangas" :key="manga.id_serie">
          <manga-livre-card :manga="manga" />
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import MangaLivreCard from "./MangaLivreCard";
export default {
  data: () => ({
    valid: false,
    mangaName: "",
    mangaNameRules: [
      v => !!v || "Titulo do manga e obrigatorio",
      v => v.length >= 3 || "O titulo precisa ter no minio 3 caractrs... "
    ],
    mangas: []
  }),
  methods: {
    searchManga() {
      this.$multiservice
        .post(`/mangaslivre`, {
          url: "https://mangalivre.com/lib/search/series.json",
          BodyRequest: {
            search: this.mangaName
          },
          RequestType:1
        })
        .then(Response => {
          this.mangas = Response.data.series;
        });
    }
  },
  components: { MangaLivreCard }
};
</script>

<style>
</style>