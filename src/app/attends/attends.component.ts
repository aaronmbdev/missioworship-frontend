import { Component, OnInit } from '@angular/core';
import { ISimple } from '../_common/interfaces/ISimple';
import { AbsenseService } from '../_common/services/absense.service';
import { IAbsenceFilterRequest, IAbsenceRequest } from '../_common/interfaces/IAbsence';
import { moment } from '../_common/managers/moment';
import { addZero } from '../_common/managers/customFunc';

@Component({
  selector: 'app-attends',
  templateUrl: './attends.component.html',
  styleUrls: ['./attends.component.scss']
})
export class AttendsComponent implements OnInit {

  monthNum:number = 6;
  loaded:boolean = false;

  _meses = [
    {name:'Enero', days:31},
    {name:'Febrero', days:28},
    {name:'Marzo', days:31},
    {name:'Abril', days:30},
    {name:'Mayo', days:31},
    {name:'Junio', days:30},
    {name:'Julio', days:31},
    {name:'Agosto', days:31},
    {name:'Septiembre', days:30},
    {name:'Octubre', days:31},
    {name:'Nobiembre', days:30},
    {name:'Diciembre', days:31}
  ];

  chosenNum:number = -1;

  months:ISimple<IAbsenceItem[]>[] = [];

  constructor(
    private absenceService:AbsenseService
  ) { }

  ngOnInit(): void {
    this.getMonths();
  }


  getMonths(){
    this.listMonths();
    let start = moment().setDate(1)
    let filter:IAbsenceFilterRequest = {
      begin: start.format('yyyy-MM-dd'),
      end: start.addMonths(this.monthNum).format('yyyy-MM-dd'),
    };
    this.absenceService.filter(filter).subscribe({
      next: data =>{
        console.log(data);
        data.forEach(day => {
          this.addAbsentDate(day);
        });
        this.loaded = true;
      }, error: err =>{
        this.loaded = true;
      }
    });
  }

  addAbsentDate(day:string){
    let mo = parseInt(day.split('-')[1])-1;
    let i = this.months.findIndex(m => mo == m.id);
    if(i<0) return;
      let j = this.months[i].value!.findIndex(d => day == d.date);
    if(j>-1)
      this.months[i].value![j].value = false;
    console.log(this.months[i].value![j]);
    console.log(i,j);
    console.log(this.months);
  }

  listMonths(){
    let dat = new Date();
    dat.setDate(1);
    let m = dat.getMonth();
    let d = dat.getDay()+1;
    let y = dat.getFullYear();
    for(let i = 0; i<this.monthNum;i++){
      let ds:IAbsenceItem[] = [];
      while(d<this._meses[m].days){
        ds.push({id:d+1,name:'',value:true,
        date: [y,addZero(m+1),addZero(d+1)].join('-')
      });
        d+=7;
      }
      d-=this._meses[m].days;
      this.months.push({
        id:m,
        name:this._meses[m].name,
        value:ds
      })
      if(m==11) m=0;
      else m++;
    }
    console.log(this.months)
  }
  getDayStatus(day:IAbsenceItem):boolean|undefined{
    return this.loaded?day.value:undefined;
  }
  getDayIcon(day:IAbsenceItem):string{
    if(!this.loaded)return 'sync';
    switch(day.value){
      case true: return 'task_alt';
      case false: return 'cancel';
      default: return 'sync';
    }
  }

  get chosen(){
    if(this.chosenNum<0)
      return {id:0,name:''}
    return this.months[this.chosenNum];
  }
  clickedDay(i:number){
    if(!this.loaded) return;
    let j = this.chosenNum;
    if(this.months[j].value![i].value==undefined)return;
    let oldState = this.months[j].value![i].value;
    this.months[j].value![i].value = undefined;
    let request:IAbsenceRequest = {
      absenceDate:this.months[j].value![i].date
    };
    (oldState?
      this.absenceService.absent(request):
      this.absenceService.attend(request)
    ).subscribe({
      next: data => {
        this.months[j].value![i].value = !oldState;
      }, error: err => {
        this.months[j].value![i].value = oldState;
      }
    });
  }

  /* clickedDay(i:number){
    let j = this.chosenNum;
    if(this.months[j].value![i].value==undefined)return;
    if(this.months[j].value![i].value){
      this.months[j].value![i].value = undefined;
      setTimeout(()=>{
        this.months[j].value![i].value = false;
      },1000);
    } else {
      this.months[j].value![i].value = undefined;
      setTimeout(()=>{
        this.months[j].value![i].value = true;
      },1000);
    }
  } */
  
}

export interface IAbsenceItem{
  id: number,
  date: string,
  name: string,
  value?: boolean
}