/** Componente para facilitar la implementación de SpamProtect
 */
export class SpamProtectManager{
    private keys:{[key:string]:true} = {};
    private privActive:boolean = false;

    get active():boolean{
        return this.privActive;
    }
    set active(val:boolean){
        this.privActive = val;
        if(val)
            this.keys['active']=true;
        else
            this.keys = {};
    }

    /**
     * Register a new active process
     * @param key name of the process
     */
    on(key:string):true{
        this.privActive = true;
        this.keys[key]=true;
        return true;
    }

    /**
     * Removes an active process, if no key is provided, removes all process
     * @param key name of the process
     * @returns true in case there's still other active process
     */
    off(key?:string):boolean{
        if(!key)
            this.keys = {};
        else{
            delete this.keys[key];
            for(let i in this.keys)
                if(this.keys[i]==true)
                    return true;
        }
            
        this.privActive = false;
        return false;
    }

    /**
     * function for angular atributes, for a boolean use "isLoaded(key)" instead
     * @param key name of the process
     */
    loading(key:string):''|undefined{
       return this.keys[key] == true?'':undefined;
    }

    /**
     * returns true in case the process is not active
     * @param key name of the process
     */
    isLoaded(key:string):boolean{
        return this.keys[key] != true;
     }
}
