<template>
  <v-container fluid>
    <v-form v-model="valid">
      <v-container grid-list-xl>
        <v-layout wrap>
          <v-flex xs4 md4>
            <v-text-field label="Youtube URL" :rules="youtubeUrlRules" v-model="ytUrl" />
          </v-flex>
          <v-flex xs4 md4>
            <v-text-field label="Nome" v-model="videoName" />
          </v-flex>
          <v-flex md4 xs4>
            <v-select
              v-model="select"
              :hint="`${select.descricao} - ${select.state}`"
              :items="qualityItems"
              item-text="descricao"
              item-value="state"
              label="qualidade"
              persistent-hint
              return-object
              single-line
            />
          </v-flex>
          <v-flex md12 xs12 v-if="showVideoInfo">
            <v-card max-width="600">
              <v-row class="py-4 pl-4">
                <v-col>
                  <v-card-text>{{videoInfo.player_response.videoDetails.title}}</v-card-text>
                </v-col>
                <v-col class="shrink">
                  <v-img
                    :height="videoInfo.player_response.videoDetails.thumbnail.thumbnails[0].height"
                    :width="videoInfo.player_response.videoDetails.thumbnail.thumbnails[0].width"
                    :src="videoInfo.player_response.videoDetails.thumbnail.thumbnails[0].url"
                  />
                </v-col>
              </v-row>
            </v-card>
          </v-flex>
          <v-flex xs12 md12>
            <v-btn color="primary" @click.stop="downloadVideo" :disabled="!valid">
              <v-icon left>mdi-magnify</v-icon>Download
            </v-btn>&nbsp;
            <v-btn color="primary" :disabled="!valid" @click.stop="getYoutubeVideoInfo">
              <v-icon left>mdi-card-search-outline</v-icon>Information
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    ytUrl: "",
    showDownloadLink: false,
    youtubeUrlRules: [v => v.length > 12 || "Url youtube invalida"],
    videoName: "",
    select: { state: "highest", descricao: "highest audio and video" },
    videoInfo: {},
    showVideoInfo: false,
    qualityItems: [
      { state: "highest", descricao: "highest audio and video" },
      { state: "lowest", descricao: "lowest audio and video" },
      { state: "highestaudio", descricao: "highestaudio (just audio)" },
      { state: "lowestaudio", descricao: "lowestaudio (just audio)" },
      { state: "highestvideo", descricao: "highestvideo (just video)" },
      { state: "lowestvideo", descricao: "lowestvideo (just video)" }
    ]
  }),
  methods: {
    downloadVideo() {
      const url = `http://localhost:5001/api/yt-download?yt_url=${this.ytUrl}&quality=${this.select.state}&name=${this.videoName}`;
      window.open(url);
    },
    getYoutubeVideoInfo() {
      this.$multiservice
        .get(`yt-info?yt_url=${this.ytUrl}`)
        .then(resp => {
          this.videoInfo = resp.data;
          this.showVideoInfo = true;
        })
        .catch(err => alert(err));
    }
  }
};
</script>

<style>
</style>