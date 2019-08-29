<template>
  <v-container fluid>
    <v-container grid-list-xl>
      <v-layout wrap>
        <v-flex xs12 md12>
          <v-toolbar>
            <v-toolbar-title>Menu Capitulos</v-toolbar-title>
            <div class="flex-grow-1"></div>
            <v-btn icon @click="orderType = 'desc'" class="active">
              <v-icon>mdi-arrow-down</v-icon>
            </v-btn>
            <v-btn icon @click="orderType = 'asc'">
              <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
          </v-toolbar>
        </v-flex>
        <v-flex xs4 md4 v-for="(chapter, index) in chapters" :key="index">
          <v-card class="mx-auto" tile>
            <v-img height="300px" :src="manga.cover" position="top center">
              <div class="indigo darken-4 text-center">
                <v-card-title
                  class="align-end fill-height font-weight-black white--text"
                >{{chapter.name}}</v-card-title>
              </div>
            </v-img>
            <v-card-title>Capitulo: {{chapter.number}}</v-card-title>
            <v-card-text>
              <div>Data: {{chapter.date}}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="deep-purple accent-4" text @click="readChapter(chapter)">Ler</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      inactive: true,
      manga: this.$store.state.mangas.manga,
      orderType:'desc'
    };
  },
  computed:{
    chapters() {
        let chaptersArray = this.$store.state.mangas.chapters;

        chaptersArray.sort((a, b) => {
            if(this.orderType == 'asc'){
              return a.number - b.number;
            }else{
              return b.number - a.number;
            }
        })

        return chaptersArray;
     }
  },
  methods: {
    readChapter(chapter) {
      let releases = Object.keys(chapter.releases);
      this.$multiservice
        .post("/mangaslivre", {
          url: `https://mangalivre.com/${chapter.releases[releases[0]].link}`,
          RequestType: 2,
          BodyRequest: {},
          isAjax: false
        })
        .then(async Response => {
          try {
            let dataHtml = Response.data;
            let doc = document.implementation.createHTMLDocument();
            doc.documentElement.innerHTML = dataHtml;
            let token = getTokenfromColletion(
              doc.getElementsByTagName("script")
            );
            let response = await this.$multiservice.post("/api/mangaslivre", {
              url: `https://mangalivre.com/leitor/pages/${chapter.releases[releases[0]].id_release}.json?key=${token}`
            });
            this.$store.commit("setReaderChapter", {
              chapter,
              images: response.data
            });
            this.$router.push({ name: "chapter_reader" });
          } catch (ex) {
            alert(
              "ooops erro na aplicação na hora de fazer hack no manga pages"
            );
          }
        });
    }
  }
};
function getTokenfromColletion(collection) {
  for (let i in collection) {
    try {
      let token = new URL(collection[i].src).searchParams.get("token");
      if (token != null) {
        return token;
      }
    } catch (ex) {
      continue;
    }
  }
}
</script>

<style scoped>
.title-max {
  text-overflow: ellipsis;
  max-height: 50px;
}
</style>