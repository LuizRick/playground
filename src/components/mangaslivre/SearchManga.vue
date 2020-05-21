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
        <v-flex md12>
          <h1>Lidos Recentemente</h1>
          <v-row>
            <v-col md="4" v-for="manga in mangasHistory" :key="manga.id">
              <v-card class="mx-auto" max-width="400">
                <v-img
                  class="black--text align-end"
                  :src="manga.cover"
                  height="200"
                  position="center top"
                >
                  <v-card-title>
                    <slot>
                      <b class="card-btext">{{manga.name}}</b>
                    </slot>
                  </v-card-title>
                </v-img>
                <v-card-text class="text--primary">
                  <div>Criando em : {{new Date(manga.createAt).toLocaleDateString()}}</div>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="orange" outlined @click="viewChapter(manga)">Capitulos</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-flex>
        <v-flex md12>
          <h1>Favoritos</h1>
          <v-row>
            <v-col md="4" v-for="manga in mangasFavoritos" :key="manga.id_serie">
              <manga-livre-card :manga="manga" />
            </v-col>
          </v-row>
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
    mangas: [],
    mangasHistory: [],
    mangasFavoritos: []
  }),
  methods: {
    searchManga() {
      this.$store.commit("setLoading", true);
      this.$multiservice
        .post(`/mangaslivre`, {
          url: "https://mangalivre.net/lib/search/series.json",
          BodyRequest: {
            search: this.mangaName
          },
          RequestType: 1
        })
        .then(Response => {
          this.mangas = Response.data.series;
        });
      this.$store.commit("setLoading", false);
    },
    async viewChapter(manga) {
      let pageCount = 1;
      let newRequest = true;
      let chapters = [];
      this.$store.commit("setLoading", true);
      do {
        let response = await this.$multiservice.post("/mangaslivre", {
          url: `https://mangalivre.net/series/chapters_list.json?page=${pageCount}&id_serie=${manga.idSerie}`,
          RequestType: 1,
          BodyRequest: {}
        });

        for (var x in response.data.chapters) {
          chapters.push(response.data.chapters[x]);
        }
        pageCount += 1;
        newRequest = response.data.chapters != false;
      } while (newRequest);
      this.$store.commit("setMangaChapters", chapters);
      this.$store.commit("setMangaSelected", manga);
      this.$store.commit("setLoading", false);
      this.$router.push({ name: "manga_chapters" });
    },
    loadMangas() {
      this.$store.commit("setLoading", true);
      this.$api
        .post("/graphql", {
          query: `query {
            findAllMangas{
              id
              name
              cover
              idSerie
              createAt
            }
          }`
        })
        .then(({ data }) => {
          this.mangasHistory = data.data.findAllMangas.sort(
            (a, b) => b.id - a.id
          );
        });

      this.$multiservice.get("/getMangasFavoritos").then(({ data }) => {
        this.mangasFavoritos = data.resultado;
      });
      this.$store.commit("setLoading", false);
    }
  },
  components: { MangaLivreCard },
  created() {
    this.loadMangas();
  }
};
</script>

<style scoped>
.card-btext {
  text-shadow: 1px 1px 1px rgb(1, 9, 90);
}
</style>