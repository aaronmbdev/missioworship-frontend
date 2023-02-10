import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'missioworship';
  private _toggleTopBar:number = 0;
  toggledRunning = setTimeout(()=>{},1);

  constructor(
    private router : Router
  ){}

  get urlSection():string{
    let url = this.router.url.split("/");
    return url[1];
  }

  notCloseToBar(event:any){
    event.stopPropagation();
  }

  goTo(go:string){
    this.router.navigateByUrl('/'+go);
    this.toggleTopBar=true;
  }

  //#region ToggleTopBar
  get toggleTopBar():boolean{
    return this._toggleTopBar<2;
  }
  set toggleTopBar(val:boolean){
    clearTimeout(this.toggledRunning);
    if(val){
      if(this._toggleTopBar == 2)
        this.toggledRunning = setTimeout(()=>{
          this._toggleTopBar = 0;
        },500);
      this._toggleTopBar = 1;
    } else {
      if(this._toggleTopBar == 0)
        this._toggleTopBar=1;
      this.toggledRunning = setTimeout(()=>{
        this._toggleTopBar = 2;
      },1);
    }
  }

  get displayTopShadow():boolean{
    return this._toggleTopBar!=0;
  }
  set displayTopShadow(val:boolean){
    clearTimeout(this.toggledRunning);
    if(val)
      this._toggleTopBar = 3;
    else {
      this._toggleTopBar = 0;
    }
  }

  get topShadowDark():''|undefined{
    return this._toggleTopBar==2?'':undefined;
  }
  set topShadowDark(val:''|undefined){
    this.toggleTopBar = val=='';
  }
  //#endregion
}
