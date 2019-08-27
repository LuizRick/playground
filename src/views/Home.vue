<template>
  <div id='apphome'>
    <search-manga />
    <youtube-downloader />
  </div>
</template>

<script>
import SearchManga from '@/components/mangaslivre/SearchManga'
import YoutubeDownloader from '@/components/youtube/YoutubeDownloader'
export default {
  components: { SearchManga, YoutubeDownloader }
};
</script>
