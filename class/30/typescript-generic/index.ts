// 1. STRING TYPE

function getString(arg: string): string {
    return arg;
}

const result1 = getString("철수");

// 2. NUMBER TYPE

function getNumber(arg: number): number {
    return arg;
}

const result2 = getNumber(8);

// 3. ANY TYPE

function getAny(arg: any): any {
    return arg;
}

const result3 = getAny(10);
const result4 = getAny("훈이");
const result5 = getAny(true);

// 4. GENERIC TYPE
// 뭔지 모르지만 -> any랑 비슷하지만 그 들어올 당시의 타입을 기억하고 있다가 그 타입이 고정되어 버림.
// 그럼 들어올때는 any랑 똑같이 모두 다 받을 수 있지만, 리턴 타입은 예측 가능해짐.

function getGeneric<MyType>(arg: MyType): MyType {
    return arg;
}

const result6 = getGeneric(10);
const result7 = getGeneric("훈이");
const result8 = getGeneric(true);

// ANY 와 GENERIC

function getAnyReverse(arg1: any, arg2: any, arg3: any): [any, any, any] {
    return [arg3, arg2, arg1];
}
const result9 = getAnyReverse("철수", "다람쥐초등학교", 8);

function getGenericReverse<MyType1, MyType2, MyType3>(arg1: MyType1, arg2: MyType2, arg3: MyType3): [MyType3, MyType2, MyType1] {
    return [arg3, arg2, arg1];
}

const result10 = getGenericReverse("철수", "다람쥐초등학교", 8);

// 정말 똑같은 내용인데 MyType 너무 길어서 T#로 짧게 축약 버전
function getGenericReverseShort<T1, T2, T3>(arg1: T1, arg2: T2, arg3: T3): [T3, T2, T1] {
    return [arg3, arg2, arg1];
}

// 정말 똑같은 내용인데 MyType 또 너무 길어서 한 문자로 짧게 축약 버전
function getGenericReverseShorter<T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] {
    return [arg3, arg2, arg1];
}