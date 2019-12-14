export default {
    state:{
        showDrawer:false,
        showTopBar:true,
        loading:false,
        loadingMsg:'',
    },
    getters:{

    },
    mutations:{
        setDrawer(state,payload){
            state.showDrawer = payload;
        },
        setShowTopbar(state,payload){
            state.showTopBar = payload;
        },
        setLoading(state, payload){
            state.loading = payload;
        },
        setloadingMsg(state, payload){
            state.loadingMsg = payload;
        }
    },
    actions:{

    }
}