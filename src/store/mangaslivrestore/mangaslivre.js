export default {
    state:{
        chapters:[],
        chapter:{},
        manga:{}
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
        }
    },
    actions:{

    }
}