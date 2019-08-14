<template>
  <v-container fluid>
    <v-container grid-list-xl>
      <v-layout wrap>
        <v-flex xs12 md4>
          <v-card class="mx-auto" tile>
            <v-list subheader>
              <v-subheader>Capitulos</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item
                  :inactive="inactive"
                  :link="true"
                  v-for="(chapter, i) in chapters"
                  :key="i"
                  @click.prevent="readChapter(chapter)"
                  readonly
                  to="/mangaslivre/chapter/read"
                >
                  <v-list-item-avatar>
                    <v-icon left>mdi-book-open-page-variant</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="chapter.name + ' capitulo ' + chapter.number" />
                    <v-list-item-subtitle>Data de release : {{chapter.date}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
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
      chapters: this.$store.state.mangas.chapters,
      inactive: true
    };
  },
  methods: {
    async readChapter(chapter) {
      let releases = Object.keys(chapter.releases);
      let data;
      await this.$multiservice
        .post("/api/mangaslivre", {
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
            this.$store.commit("setReaderChapter", { chapter, images: response.data });
            this.$router.push({ name: "chapter_reader" });
          } catch (ex) {
            alert(
              "ooops erro na aplicação na hora de fazer hack no manga pages"
            );
          }
        });
    },
    async getMangaPageUrl(token, chapter) {
      let data;
      let releases = Object.keys(chapter.releases);
      let response = await this.$multiservice.post();
    }
  },
  created() {}
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

<style>
</style>