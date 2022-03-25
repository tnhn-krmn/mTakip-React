import { observable,action, makeAutoObservable, makeObservable } from "mobx";

class AuthStore {
    appState = null;

    constructor()
    {
        makeObservable(this, {
            appState:observable,
            save:action,
            get:action,
            remove:action
        });
    };


    async save(appState)
    {
        try {
            await localStorage.setItem('appState',appState);
        } catch (e) 
        {
            console.log(e);    
        }
    }

    async get()
    {
        try {
            const appValue = localStorage.getItem('appState');
            if (appValue) 
            {
                this.appState = appValue;    
            }
            else
            {
                this.appState = null;
            }
        } catch (e) 
        {
            console.log(e);    
        }
    }

    async remove()
    {
        try {
            const appValue = localStorage.removeItem('appState');
            this.appState = null;
        } catch (e) 
        {
            console.log(e);    
        }
    }
}

export default new AuthStore();