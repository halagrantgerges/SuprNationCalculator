import { Component } from '@angular/core';
import { makeStateKey } from '@angular/platform-browser';
import { RandServiceService } from './rand-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public randServiceService:RandServiceService){}
  title = 'SuprNationCalculator';
  expression:any='';
  result:any;
  calculatorElements=[0,1,2,3,4,5,6,7,8,9,'+', '-', '∗', '/','sin', 'cos', 'tan','del','C','RAND'];
  shouldInsertBraces=false;


  // this function is being called at the change of the input
  onChange(newValue:any) {
// check if the value is not empty
    if(newValue===''){
      this.result='';
      return;
    }
    const evaluation=this.evaluateExp(newValue);
    this.result =isNaN(evaluation)?' Invalid Expression!':evaluation;  
}

// this method appends expression from the UI calculator to the current expression
appendExp(expr:any){
  switch(expr){
    case 'del':
      this.expression=this.expression.length>0?this.expression.slice(0, -1):this.expression;
      this.onChange(this.expression);
      break;
    case 'C':
      this.expression='';
      this.onChange(this.expression);
      break;
      case 'RAND':
        this.randServiceService.getRandValue().subscribe(rand=>{
          this.expression+=rand.toString()+this.insertBraces();
          this.onChange(this.expression);
        })
        break;
        case 'sin':  case 'cos':  case 'tan':
          this.expression+=this.insertBraces()+expr.toString()+'(';
          this.shouldInsertBraces=true;
          this.onChange(this.expression);
        break;
     default:
    
  this.expression+=expr.toString()+this.insertBraces();
  this.onChange(this.expression);
       break; 

  }
  
}
insertBraces(){
  if(this.shouldInsertBraces){
this.shouldInsertBraces=false;
    return ')';
  }
  else return '';
}

//array A 
// a,b
/**
 * 
 * function mapArr<A, B>(source: A[], mapFn: (a: A) => B): B[]
 * mapArr([1, 2, 3], x => x * 2) = [2, 4, 6]
 */
mapArr<A, B>(source: A[], mapFn: (a: A) => B): B[]{

  let resArr:B[]=[];
  source.forEach(element=>{
resArr.push(mapFn(element));
});
return resArr;
}
/**
 * 
 * function flatMapArr<A, B>(source: A[], mapFn: A => B[]): B [] = ???
 * 
 */
//  flatMapArr<A, B>(source: A[], mapFn: B[]): B[]{
  flatMapArr<A, B>(source: A[], mapFn: (a: A) => B[]): B [] {
  let resArr:B[]=[];
  source.forEach(element=>{
resArr.concat(mapFn(element));
});
return resArr;
}

/**
 * 
 *  filter([1, 2, 3], x => x % 2 == 0)
2
[2]
 */
filterArr<A>(source: A[], mapFn: (a: A) => boolean): A [] {
  let resArr:A[]=[];
  source.forEach(element=>{
    if(mapFn(element)){
resArr.push(element);
    }
});
return resArr;
}

evaluateExp (expr:any) {
  console.log("evaluating",expr);
  // locate braces and evaluate expressions between braces using recursion
  const innerBracesArr=expr.match(/\((.*?)\)/g)?.map((b:any)=>b.replace(/\(|(.*?)\)/g,"$1"));
  //     expr.match(/((sin)|(cos)|(tan))\((.*?)\)/g)?.map((b)=>b.replace(/(.*?\))\)/g,"$1"))
 //  const innerBracesArr=expr.match(/((sin)|(cos)|(tan))?\((.*?)\)/g)?.map((b:any)=>b.replace(/(.*?\))\)/g,"$1"));;
 innerBracesArr?.forEach((innerExpression:any) => {
   if(isNaN(innerExpression)){ // not a number which means expression (evaluate inner expression)
    expr= expr.replace('('+innerExpression+')',this.evaluateExp(innerExpression) ) ;
   }
 });
  var chars = expr;

  


  var n = [], op = [], index = 0, previousCharacterIsOperator = true;

  n[index] = "";
  // Parse the expression

  for (var c = 0; c < chars.length; c++) {

    
const concat= chars[c]+''+chars[c+1]+''+chars[c+2]+''+chars[c+3];
    if(concat==='cos('||concat==='sin('||concat==='tan('){
      var finalNumber='';
      c+=4;
      while(chars[c]!=')'&&c<=chars.length){
        finalNumber+=chars[c];
        c++;
      }
      // switch 
      switch (concat){
        case 'sin(':
          chars=chars.toString().replace('sin('+finalNumber+')',Math.sin(parseInt(finalNumber)));
          break;
        case 'tan(':
          chars=chars.toString().replace('tan('+finalNumber+')',Math.tan(parseInt(finalNumber)));
          break;
        case 'cos(':
          chars= chars.toString().replace('cos('+finalNumber+')',Math.cos(parseInt(finalNumber)));
          break;
      }
     }

  }
  for (var c = 0; c < chars.length; c++) {
    // skip white spaces
   if(chars[c]===' ') continue;
   // if this character is an operator and the previous character is not an operator
   // this to avoid operator followed by another operator ex. ++
   else if (isNaN(parseInt(chars[c])) && chars[c] !== "." && !previousCharacterIsOperator) {
          op[index] = chars[c];
          index++;
          n[index] = "";
          previousCharacterIsOperator = true;
      } 
     // character is a number 
      else {
          n[index] += chars[c];
          previousCharacterIsOperator = false;
      }
  }


  // Calculate the expression
  expr = parseFloat(n[0]);

  for (var o = 0; o < op.length; o++) {
      var num = parseFloat(n[o + 1]);
      switch (op[o]) {
          case "+":
              expr = expr + num;
              break;
          case "-": case'−':
              expr = expr - num;
              break;
          case "*": case '∗':
              expr = expr * num;
              break;
          case "/":
              expr = expr / num;
              break;
          
      }
  }
  return expr;
}

}
