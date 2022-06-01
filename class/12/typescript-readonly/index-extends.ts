//내려갈수록 범위가 제한된다

// 1. public: 부모 클래스 내부, 자식 클래스 내부, 외부 모두 다 된다
class PublicVersion {
  constructor(public mypower) {
    // this.mypower = mypower;
  }
  ggg2() {
    console.log(this.mypower); // 안에서 접근 가능
    this.mypower = 10; // 안에서 수정 가능
  }
}
class Public2 extends PublicVersion {
  ggg2() {
    console.log(this.mypower); // 자식이 접근 가능
    this.mypower = 10; // 자식이 수정 가능
  }
}
const aaa = new Public2(50);
console.log(aaa.mypower); // 밖에서 접근 가능
aaa.mypower = 5; // 밖에서 수정 가능

// 2. protected: 외부 접근/수정 불가능
class ProtectedVersion {
  constructor(protected mypower) {
    // this.mypower = mypower;
  }
  ggg1() {
    console.log(this.mypower); // 안에서 접근 가능
    this.mypower = 10; // 안에서 수정 가능
  }
}
class Protected2 extends ProtectedVersion {
  ggg2() {
    console.log(this.mypower); // 자식이 접근 가능
    this.mypower = 10; // 자식이 수정 가능
  }
}
const bbb = new Protected2(50);
console.log(bbb.mypower); // 밖에서 접근 불가
bbb.mypower = 10; // 밖에서 수정 불가

// 3. private: 자식 클래스와 외부에서 접근/수정 불가능
class PrivateVersion {
  constructor(private mypower) {
    // this.mypower = mypower;
  }
  ggg1() {
    console.log(this.mypower); // 안에서 접근 가능
    this.mypower = 10; // 안에서 수정 가능
  }
}
class Private2 extends PrivateVersion {
  ggg2() {
    console.log(this.mypower); // 자식이 접근 불가
    this.mypower = 10; // 자식이 수정 불가
  }
}
const ccc = new Private2(50);
console.log(ccc.mypower); // 밖에서 접근 불가
ccc.mypower = 10; // 밖에서 수정 불가

// 4. readonly: 부모, 자식, 외부 상관없이 접근만 어디서든 가능
class ReadOnlyVersion {
  constructor(readonly mypower) {
    // this.mypower = mypower;
  }
  ggg1() {
    console.log(this.mypower); // 안에서 접근 가능
    this.mypower = 10; // 안에서 수정 불가
  }
}
class ReadOnly2 extends ReadOnlyVersion {
  ggg2() {
    console.log(this.mypower); // 자식이 접근 가능
    this.mypower = 10; // 자식이 수정 불가
  }
}
const ddd = new ReadOnly2(50);
console.log(ddd.mypower); // 밖에서 접근 가능
ddd.mypower = 10; // 밖에서 수정 불가

// 5. private readonly: 부모 클래스 내부에서 접근만 가능
class PrivateReadOnlyVersion {
  constructor(private readonly mypower) {
    // this.mypower = mypower; // public, private, readonly 중 1개만 포함되면 자동으로 셋팅됨
  }
  ggg1() {
    console.log(this.mypower); // 안에서 접근 가능
    this.mypower = 10; // 안에서 수정 불가
  }
}
class PrivateReadOnly2 extends PrivateReadOnlyVersion {
  ggg2() {
    console.log(this.mypower); // 자식이 접근 불가
    this.mypower = 10; // 자식이 수정 불가
  }
}
const eee = new PrivateReadOnly2(50);
console.log(eee.mypower); // 밖에서 접근 불가
eee.mypower = 10; // 밖에서 수정 불가
