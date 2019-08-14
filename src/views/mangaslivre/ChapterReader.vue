<template>
  <v-container fluid>
    <v-container fluid>
      <v-layout flex justify-center wrap>
        <v-flex md12 align-self-center>
          <h1>Capitulo {{chapterSelected.chapter.number}}</h1>
        </v-flex>
        <v-flex xs12 md12>
          <div class="slide-container">
            <div class="slide-images">
              <v-btn
                class="ma-2 prev-image"
                small
                fab
                dark
                color="rgba(0,0,0,0.5)"
                @click="prevImage"
              >
                <v-icon>mdi-menu-left</v-icon>
              </v-btn>
              <v-btn
                class="ma-2 next-image"
                small
                fab
                dark
                color="rgba(0,0,0,0.5)"
                @click="nextImage"
              >
                <v-icon>mdi-menu-right</v-icon>
              </v-btn>
              <div
                class="slide-images-item"
                v-for="(imagem, i) in chapterSelected.images.images"
                :key="i"
              >
                <transition name="slide">
                  <img
                    :src="imagem"
                    class="slide-img"
                    v-show="selectedIndex == i"
                    width="1200"
                    @dblclick="slideFullScreen"
                  />
                </transition>
              </div>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedIndex: 0,
      chapterSelected: this.$store.state.mangas.chapter,
      isFullScreen: false
    };
  },
  methods: {
    prevImage() {
      if (this.selectedIndex > 0) {
        this.selectedIndex -= 1;
        window.scrollTo(0,0);
      }
    },
    nextImage() {
      if (this.selectedIndex < this.chapterSelected.images.images.length) {
        this.selectedIndex += 1;
        window.scrollTo(0,0);
      }
    },
    slideFullScreen() {
      if (!this.isFullScreen) {
        document.documentElement.requestFullscreen();
        this.isFullScreen = true;
      } else {
        document.exitFullscreen();
        this.isFullScreen = false;
      }
    }
  },
  mounted() {
    window.addEventListener("keyup", e => {
      if (e.keyCode == 39) {
        this.nextImage();
      }

      if (e.keyCode == 37) {
        this.prevImage();
      }

    });

    window.addEventListener('fullscreenchange', (e) => {
      if(!document.fullscreenElement){
        this.$store.commit("setShowTopbar", true);
      }else{
        this.$store.commit("setShowTopbar", false);
      }
    })
  }
};
</script>

<style scoped>
.slide-images {
  width: 1200px;
  margin: 0 auto;
  position: relative;
}

.slide-images .prev-image {
  position: absolute;
  top: 50%;
}

.slide-images .next-image {
  position: absolute;
  top: 50%;
  right: 0;
}


.fade-enter, .fade-leave-to{
	opacity: 0;
}

.fade-enter-active, .fade-leave-active{
	transition: opacity 2s;
}


@keyframes slide-in {
    100% { transform: translateX(0%); }
}

@keyframes slide-out {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-100%); }
}

.slide-enter-active{
	 animation: slide-in 0.3s forwards;
}

.slide-leave-active{
	animation: slide-out 0.3s forwards;
}

@media all and (display-mode: fullscreen) {
  body{
    background-color: darkslategray;
  }
}
</style>