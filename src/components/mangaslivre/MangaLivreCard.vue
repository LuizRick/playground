<template>
  <v-card class="mx-auto" max-width="374">
    <v-img class="white--text lighten-3" height="200" :src="manga.cover" position="center top">
      <v-card-title class="align-end fill-height">
        <div class="transparent-bg">
          {{manga.label}}
        </div>
      </v-card-title>
    </v-img>
    <v-card-text>
      <p>
        <b>Categorias</b>
      </p>
      <div>
        <span v-for="categoria in manga.categories" :key="categoria.id_category">{{categoria.name}}/</span>
      </div>
      <v-layout align-center>
        <v-rating :value="manga.score / 2" color="amber" size="14" readonly></v-rating>
        <div class="grey--text ml-4">
          <span>{{(manga.score / 2).toFixed(2)}}</span>
        </div>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="orange" @click="verCapitulos">Ver capitulos</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    manga: Object
  },
  methods:{
      async verCapitulos(){
          let pageCount = 1;
          let newRequest = true;
          let chapters = [];
          this.$store.commit("setLoading", true);
          do{
              let response = await this.$multiservice.post('/mangaslivre',{
                url:`https://mangalivre.com/series/chapters_list.json?page=${pageCount}&id_serie=${this.manga.id_serie}`,
                RequestType: 1,
                BodyRequest: {}
              });
              
              for(var x in response.data.chapters){
                  chapters.push(response.data.chapters[x]);
              }
              pageCount += 1;
              newRequest = response.data.chapters != false;
          }while(newRequest);
          this.$api.post('/graphql', {
            query: `mutation createNewManga($mangaInput:MangaInput!) {
              newManga(mangaInput:$mangaInput){
                id
                idSerie
                name
                cover
                createAt
              }
            }`,
            variables:{
              "mangaInput": {
                idSerie:this.manga.id_serie,
                cover:this.manga.cover,
                name:this.manga.name
              }
            }
          });
          this.$store.commit("setLoading", false);
          this.$store.commit('setMangaChapters', chapters);
          this.$store.commit('setMangaSelected', this.manga);
          this.$router.push({name:'manga_chapters'});
      }
  }
};
</script>

<style scoped>
  .transparent-bg{
    background-color: rgba(0, 0, 0, 0.5);
    padding: 12px 5px;
    text-overflow: ellipsis;
  }
</style>