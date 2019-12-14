<template>
  <v-card class="mx-auto" max-width="374">
    <v-img class="white--text lighten-3" height="200" :src="manga.cover" position="center top">
      <v-card-title class="align-end fill-height">
        <div class="transparent-bg">{{manga.label}}</div>
      </v-card-title>
    </v-img>
    <v-card-text>
      <p>
        <b>Categorias</b>
      </p>
      <div class="text-elipsed">{{mangaCategories}}</div>
      <v-layout align-center>
        <v-rating :value="manga.score / 2" color="amber" size="14" readonly></v-rating>
        <div class="grey--text ml-4">
          <span>{{(manga.score / 2).toFixed(2)}}</span>
        </div>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="orange" @click="verCapitulos">Ver capitulos</v-btn>
      <v-btn color="blue" outlined @click="addFavorito">
        <v-icon dense>mdi-star</v-icon>&nbsp;Favorito
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
const SET_LOADING = "setLoading";
export default {
  props: {
    manga: Object
  },
  computed: {
    mangaCategories() {
      let categories = "";
      this.manga.categories.forEach(v => {
        categories +=  v.name + "/";
      });
      return categories;
    }
  },
  methods: {
    async verCapitulos() {
      let pageCount = 1;
      let newRequest = true;
      let chapters = [];
      this.$store.commit(SET_LOADING, true);
      do {
        let response = await this.$multiservice.post("/mangaslivre", {
          url: `https://mangalivre.com/series/chapters_list.json?page=${pageCount}&id_serie=${this.manga.id_serie}`,
          RequestType: 1,
          BodyRequest: {}
        });

        for (var x in response.data.chapters) {
          chapters.push(response.data.chapters[x]);
        }
        pageCount += 1;
        newRequest = response.data.chapters != false;
      } while (newRequest);
      this.$api.post("/graphql", {
        query: `mutation createNewManga($mangaInput:MangaInput!) {
              newManga(mangaInput:$mangaInput){
                id
                idSerie
                name
                cover
                createAt
              }
            }`,
        variables: {
          mangaInput: {
            idSerie: this.manga.id_serie,
            cover: this.manga.cover,
            name: this.manga.name
          }
        }
      });
      this.$store.commit(SET_LOADING, false);
      this.$store.commit("setMangaChapters", chapters);
      this.$store.commit("setMangaSelected", this.manga);
      this.$router.push({ name: "manga_chapters" });
    },
    async addFavorito() {
      this.$store.commit(SET_LOADING, true);
      let response = await this.$multiservice.post("/saveMangaFavorito", {
        manga: this.manga
      });

      if (response.data.resultado > 0) {
        alert("Manga salvo a lista de favoritos");
      }

      this.$store.commit(SET_LOADING, false);
    }
  }
};
</script>

<style scoped>
.transparent-bg {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 12px 5px;
  text-overflow: ellipsis;
}

.text-elipsed {
  text-overflow: ellipsis;
  width: 100%;
  overflow: hidden;
}
</style>