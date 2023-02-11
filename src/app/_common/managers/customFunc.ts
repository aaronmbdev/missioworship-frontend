export function addZero(num:number|string, zeros: number=2):string{
    if(typeof num == 'number'){
        if(zeros==2){
            if(num>9)
                return num.toString();
            else
                return '0'+num;
        }
        return addZero01(num, zeros);
    }
    else{
        if(num.length>=zeros)
            return num;
        return addZero02(num,zeros);
    }
}

function addZero01(num:number, zeros: number):string {
    return addZero02(num.toString(),zeros);
}
function addZero02(num:string, zeros: number):string {
    if(num.length==zeros+1)
        return 0+num;
    if((zeros-num.length)%2==1)
        num=0+num;
    let z:number[] = [];
    while((z.length*2)+num.length<zeros)
        z.push(0);
    return [...z,num].join('0');
}