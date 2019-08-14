export default {
    state:{
        showDrawer:false,
        showTopBar:true,
    },
    getters:{

    },
    mutations:{
        setDrawer(state,payload){
            state.showDrawer = payload;
        },
        setShowTopbar(state,payload){
            state.showTopBar = payload;
        }
    },
    actions:{

    }
}