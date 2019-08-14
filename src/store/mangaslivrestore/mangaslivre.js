export default {
    state:{
        chapters:[],
        chapter:{}
    },
    getters:{

    },
    mutations:{
        setMangaChapters(state, payload){
            state.chapters = payload;
        },
        setReaderChapter(state, payload){
            state.chapter = payload;
        }
    },
    actions:{

    }
}