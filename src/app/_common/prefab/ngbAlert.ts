export class ngbAlerts{
    private _i:number = 0;
    private _alerts:{[id:string]:ngbAlert} = {};
    private _params:AlertParams = {};

    constructor(params?:AlertParams){
        if(params)
            this._params = params;
    }
    
    get alerts():ngbAlert[]{
        console.log(this._alerts)
        let retorno = [];
        return Object.keys(this._alerts).map(t => this._alerts[t]);
    }

    send(msg:string,params?:AlertParams){
        let par = Object.assign({},this._params);
        if(params)
            Object.assign(par,params);
        this._i++;
        let pI = this._i.toString(36);
        if(par.onClose){
            let userOnClose = par.onClose;
            par.onClose = ()=>{
                this.closeAlert(pI);
                userOnClose();
            };
        } else par.onClose = () => this.closeAlert(pI);
        let al = new ngbAlert(par);
        al.send(msg);
        this._alerts[pI] = al;
    }
    private closeAlert(id:string){
       delete this._alerts[id];
    }
}

export class ngbAlert{
    private _msg?:string;
    private _type:string = 'info';
    private _selfClose?:number;
    private _closing = setTimeout(()=>{},1);
    private _onClose?:()=>void;

    constructor(params?:AlertParams){
        if(params)
            this.setParams(params)
    }

    get msg():string{
        return this._msg??'';
    }
    get type():string{
        return this._type;
    }
    get active():boolean{
        if(this._msg)
            return true;
        return false;
    }
    get close():boolean{
        if(this._onClose)
            this._onClose();
        if(this._msg){
            this._msg = undefined;
            return true;
        }
        return false;
    }

    send(msg:string,params?:AlertParams){
        this._msg = msg;
        if(params)
            this.setParams(params)
        if(this._selfClose){
            clearTimeout(this._closing);
            this._closing = setTimeout(()=>this.close,this._selfClose);
        }
    }
    private setParams(params:AlertParams){
        if(params.type)
            this._type = params.type;
        switch(typeof params.selfClose){
            case 'boolean': this._selfClose = params.selfClose?5000:undefined; break;
            case 'number': this._selfClose = params.selfClose; break;
        }
        if(params.onClose)
            this._onClose = params.onClose;
    }
}

interface AlertParams{
    type?:
        'primary'|'secondary'|'success'|'info'|
        'warning'|'danger'|'light'|'dark',
    selfClose?:number|boolean,
    onClose?:()=>void
}