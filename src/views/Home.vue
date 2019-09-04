<template>
  <v-layout wrap>
    <v-flex md12>
      <v-carousel>
        <v-carousel-item v-for="(image, i) in images" :key="i" :src="image"></v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    images: [
      "https://res.cloudinary.com/luizhenrique/image/upload/v1567563719/carousel/mangas-carousel-image-1.png",
      "https://res.cloudinary.com/luizhenrique/image/upload/v1567563719/carousel/youtube-carousel-image-1.png",
      "http://res.cloudinary.com/luizhenrique/image/upload/v1567563719/carousel/youtube-carousel-image-2.png",
    ]
  })
};
</script>
