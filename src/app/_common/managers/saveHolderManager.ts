export class SaveHolderManager{

    private hq:{key:number|string,t:any}[] = [];

    constructor(){

    }

    save(key:number|string,action:()=>void){
        let s = this.hq.find(h => h.key === key);
        if(s){
            clearTimeout(s.t);
            s.t = setTimeout(()=>{
                let i = this.hq.findIndex(h => h.key === key);
                if(i>-1)
                    delete this.hq[i];
                action();
            },10000);
        }
        else {
            this.hq.push({
                key:key,
                t:setTimeout(()=>{
                    let i = this.hq.findIndex(h => h.key === key);
                    if(i>-1)
                        delete this.hq[i];
                    action();
                },10000)
            })
        }
    }
}