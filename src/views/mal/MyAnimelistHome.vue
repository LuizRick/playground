<template>
  <v-container>
    <v-btn color="blue" dark bottom right fab fixed @click="setUpDownScroll">
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>
    <v-row>
      <v-col sm="12">
        <h1>Anime of Season ({{season}} - {{anoAtual}})</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="4" class="my-2 px-1">
        <v-date-picker
          ref="picker"
          locale="pt-BR"
          v-model="date"
          :picker-date.sync="pickerDate"
          full-width
        ></v-date-picker>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="anime in animesMal" :key="anime.mal_id" sm="3" class="pb-10">
        <v-card class="mx-auto">
          <v-img
            class="white--text align-end"
            :src="anime.image_url"
            max-height="200"
            aspect-ratio="1.7"
            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
          >
            <v-card-title>{{anime.title}}</v-card-title>
          </v-img>
          <v-card-text class="text-primary pl-0 pr-0">
            <v-chip
              v-for="genero in anime.genres"
              :key="genero.mal_id"
              x-small
              class="ml-2 mb-2"
            >{{genero.name}}</v-chip>
          </v-card-text>
          <v-card-text class="text-primary">
            <div>
              <b>{{anime.source}}</b> /
              <b>{{anime.type}}</b>
            </div>
          </v-card-text>
          <v-card-text class="text-primary">
            <div>
              <b>Lancamento:</b>
              {{toDataAtual(anime.airing_start)}}
            </div>
          </v-card-text>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>Sinopse</v-expansion-panel-header>
              <v-expansion-panel-content>{{anime.synopsis}}</v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const SET_LOADING = "setLoading";
export default {
  data: () => ({
    animesTemporada: [],
    season: getSeason(),
    anoAtual: new Date().getFullYear(),
    date: null,
    pickerDate: null
  }),
  methods: {
    toDataAtual(dateString) {
      return new Date(dateString).toLocaleDateString();
    },
    setUpDownScroll() {
      window.scrollTo({ top: 0 });
    }
  },
  computed: {
    animesMal() {
      let animes = Array.from(this.animesTemporada);
      if (this.date != null) {
        animes = animes.filter(
          anime =>
            new Date(anime.airing_start) <= new Date(this.date + "T00:00:00")
        );
      }
      return animes;
    }
  },
  created() {
    this.$store.commit(SET_LOADING, true);
    this.$multiservice
      .get(`/mal-season?season=${this.season}&year=${this.anoAtual}`)
      .then(resp => {
        this.animesTemporada = resp.data.anime;
        this.$store.commit(SET_LOADING, false);
      })
      .catch(() => {
        this.$store.commit(SET_LOADING, false);
      });
  }
};

function getSeason() {
  let month = new Date().getMonth() + 1 + "";
  let season = "";
  switch (month) {
    case "12":
    case "1":
    case "2":
      season = "winter";
      break;
    case "3":
    case "4":
    case "5":
      season = "spring";
      break;
    case "6":
    case "7":
    case "8":
      season = "summer";
      break;
    case "9":
    case "10":
    case "11":
      season = "fall";
      break;
  }

  return season;
}
</script>

<style scoped>
.synopse {
  min-height: 200px;
  max-height: 200px;
  overflow-y: scroll;
}

.synopse::-webkit-scrollbar {
  width: 10px;
}

.synopse::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.synopse::-webkit-scrollbar-thumb {
  background: #888;
}

.synopse::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>