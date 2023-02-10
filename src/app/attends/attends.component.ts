import { Component, OnInit } from '@angular/core';
import { ISimple } from '../_common/interfaces/ISimple';
import { AbsenseService } from '../_common/services/absense.service';
import { IAbsenceFilterRequest } from '../_common/interfaces/IAbsence';

@Component({
  selector: 'app-attends',
  templateUrl: './attends.component.html',
  styleUrls: ['./attends.component.scss']
})
export class AttendsComponent implements OnInit {

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

  months:ISimple<ISimple<boolean>[]>[] = [];

  constructor(
    private absenceService:AbsenseService
  ) { }

  ngOnInit(): void {
    this.listMonths();
  }


  getMonths(){
    this.listMonths();
    let filter:IAbsenceFilterRequest = {};
    filter.startDate = new Date();
    filter.startDate.setDate(0);
    this.absenceService.filter(filter).subscribe({
      next: data =>{
        data.forEach(day => {
          this.addAbsentDate(day);
        });
      }, error: err =>{

      }
    });
  }

  addAbsentDate(date:Date){
    let i = this.months.findIndex(m =>  date.getMonth() == m.id);
    if(i<0) return;
    let j = this.months[i].value!.findIndex(d => date.getDay() == d.id);
    if(i>0)
    this.months[i].value![j].value = false;
  }

  listMonths(){
    let m = (new Date()).getMonth();
    let d = (new Date()).getDay()+1;
    for(let i = 0; i<6;i++){
      let ds:ISimple<boolean>[] = [];
      while(d<this._meses[m].days){
        ds.push({id:d+1,name:'',value:true});
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
  getDayIcon(val?:boolean){
    switch(val){
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
  }
}