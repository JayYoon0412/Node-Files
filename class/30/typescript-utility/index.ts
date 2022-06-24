//같은 이름으로 추가적으로 속성 만드는 것 가능.
//상황에 따라 다르지만, 보통 interface를 많이 쓴다.

interface IProfile {
    name: string;
    age: number;
    school: string;
    hobby?: string;
}

interface IProfile {
    apple: number;
}
//선언 병합 - CMD+I 하면 apple까지 나오는게 보인다.
// const profile: IProfile = {
// }

type Aaa = {
    name: string;
    age: number;
    school: string;
    hobby?: string;
}

//1. Partial Type: 전체 속성들이 ? 붙는 효과
type MyType1 = Partial<IProfile>
//2. Required Type: 반대로, 전체 속성들이 필수가 되는 효과
type MyType2 = Required<IProfile>
//3. Pick Type: IProfile에서 name과 age 속성만 존재하는 효과
type MyType3 = Pick<IProfile, "name" | "age">
//4. Omit Type: 반대로, name과 age 속성만 빠지는 효과
type MyType4 = Omit<IProfile, "name" | "age">
//5. Record Type
type AAA = "aaa" | "bbb" | "ccc" //union type -> record type이 되면 각각이 key가 된다.
type MyType5 = Record<AAA, string> //각각의 record에 대해서 타입을 매칭시켜준다.

//만약 union 타입을 만들고 싶다면? => "name" | "age" | "school" | "hobby"
// const aaa: keyof IProfile;
// aaa === ""
