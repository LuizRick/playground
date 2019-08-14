<template>
  <v-card class="mx-auto" max-width="374">
    <v-img class="purple--text lighten-3" height="200px" :src="manga.cover">
      <v-card-title class="align-end fill-height" elevation="10">{{manga.label}}</v-card-title>
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
          do{
              let response = await this.$multiservice.post('/api/mangaslivre',{
                Url:`https://mangalivre.com/series/chapters_list.json?page=${pageCount}&id_serie=${this.manga.id_serie}`,
                RequestType: 1,
                BodyRequest: {}
              });
              
              for(var x in response.data.chapters){
                  chapters.push(response.data.chapters[x]);
              }
              pageCount += 1;
              newRequest = response.data.chapters != false;
          }while(newRequest);
          this.$store.commit('setMangaChapters', chapters);
          this.$router.push({name:'manga_chapters'});
      }
  }
};
</script>

<style>
</style>