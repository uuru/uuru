export var firstname='张'
export var lastName='li'
export var year=1900
export var jian=(x,y)=>{
    return x-y

}
export var jia=(x,y)=>{
    return x+y
}
export class Print{
    constructor(x,y){
        this.x=x
        this.y=y
    }
    toString(){
        return ('x'+this.x+'y'+this.y)
    }
}