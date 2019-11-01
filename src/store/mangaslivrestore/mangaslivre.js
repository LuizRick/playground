export default {
    state:{
        chapters:[],
        chapter:{},
        manga:{},
        lastChapterReaded:{}
    },
    getters:{
        
    },
    mutations:{
        setMangaChapters(state, payload){
            state.chapters = payload;
        },
        setReaderChapter(state, payload){
            state.chapter = payload;
        },
        setMangaSelected(state, payload){
            state.manga = payload;
        },
        setLastChapterReaded(state, payload){
            state.lastChapterReaded = payload;
        }
    },
    actions:{

    }
}