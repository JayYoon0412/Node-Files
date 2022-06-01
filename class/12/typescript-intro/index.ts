let str: string = "hello world!"

let n: number = 10;

let m: string | number = "union operator";
m = 10;

let bool: boolean = true;

let arr: number[] = [1, 2, 3];

//객체에서 받아도 되고 없어도 되는 요소는 ?로 표기
interface IStudent {
    name: string,
    present: boolean,
    age?: number
}

let student: IStudent = {
    name: "Tom",
    present: false
}

student.present = true;

//함수에서 실행되는 타입: 함수에서는 타입 추론이 되지 않는다. 미리 지정 필요
const add = (a: number, b: number): number => {
    return a + b;
}

console.log(str);