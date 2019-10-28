<template>
  <v-container fluid>
    <v-btn color="blue" dark bottom right fab fixed @click="setUpDownScroll">
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>
    <v-container grid-list-xl>
      <v-layout wrap>
        <v-flex xs12 md12>
          <v-toolbar>
            <v-toolbar-title>Menu Capitulos</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="searchText"
              solo
              append-icon="mdi-magnify"
              hide-details
              single-line
            />
            <v-toolbar-items>
              <v-btn icon @click="viewType = types.CARD">
                <v-icon>mdi-view-module</v-icon>
              </v-btn>
              <v-btn icon @click="viewType = types.LISTA">
                <v-icon>mdi-view-list</v-icon>
              </v-btn>
              <v-btn icon @click="orderType = 'desc'" class="active">
                <v-icon>mdi-sort-descending</v-icon>
              </v-btn>
              <v-btn icon @click="orderType = 'asc'">
                <v-icon>mdi-sort-ascending</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
        </v-flex>
        <template v-if="viewType == types.CARD">
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
                <div>Data publicação: {{chapter.date}}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" text @click="readChapter(chapter)">Ler</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </template>
        <template v-if="viewType == types.LISTA">
          <v-flex md6 xs6>
            <v-list subheader>
              <v-subheader inset>{{chapters.length}} - capitulos</v-subheader>
              <v-list-item
                v-for="(chapter, index) in chapters.slice(0, chapters.length / 2)"
                :key="index"
              >
                <v-list-item-avatar>
                  <v-icon class="grey lighten-1 white--text">mdi-book-open-variant</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="chapter.name + ' capítulo ' + chapter.number" />
                  <v-list-item-subtitle v-text="'Publicado em ' + chapter.date" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-flex>
          <v-flex md6 xs6>
            <v-list subheader>
              <v-subheader inset>{{chapters.length}} - capitulos</v-subheader>
              <v-list-item
                v-for="(chapter, index) in chapters.slice(chapters.length / 2, chapters.length)"
                :key="index"
              >
                <v-list-item-avatar>
                  <v-icon class="grey lighten-1 white--text">mdi-book-open-variant</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="chapter.name + ' capítulo ' + chapter.number" />
                  <v-list-item-subtitle v-text="'Publicado em ' + chapter.date" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-flex>
        </template>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
const types = Object.freeze({ CARD: "card", LISTA: "lista" });
export default {
  data() {
    return {
      types,
      inactive: true,
      manga: this.$store.state.mangas.manga,
      orderType: "desc",
      viewType: types.CARD,
      searchText:''
    };
  },
  computed: {
    chapters() {
      let chaptersArray = this.$store.state.mangas.chapters;

      chaptersArray.sort((a, b) => {
        if (this.orderType == "asc") {
          return a.number - b.number;
        } else {
          return b.number - a.number;
        }
      });

      if(this.searchText.length > 0){
        chaptersArray = chaptersArray.filter( v => this.searchText.indexOf(v.number) >= 0)
      }

      return chaptersArray;
    }
  },
  methods: {
    setUpDownScroll() {
      window.scrollTo({ top: 0 });
    },
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
            let response = await this.$multiservice.post("/mangaslivre", {
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