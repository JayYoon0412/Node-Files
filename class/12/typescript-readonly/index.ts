// 1. public
class publicArgument {
    constructor(public mypower) {
      // this.mypower = mypower; // public, private, readonly 중 1개만 포함되면 자동으로 셋팅됨
    }
  
    printPower() {
      console.log(this.mypower);
    }
  }
  const aaa = new publicArgument(50);
  aaa.mypower = 5; // 밖에서도 가능
  
  
  
  // 2. private
  class privateArgument {
    constructor(private mypower) {
      // this.mypower = mypower; // public, private, readonly 중 1개만 포함되면 자동으로 셋팅됨
    }
  
    printPower() {
      console.log(this.mypower);
    }
  }
  
  const bbb = new privateArgument(50);
  //bbb.mypower = 5; -> Error: 밖에서 불가능!
  
  
  
  // 3. readonly
  class readOnlyArgument {
    constructor(readonly mypower) {
      // this.mypower = mypower; // public, private, readonly 중 1개만 포함되면 자동으로 셋팅됨
    }
  
    printPower() {
      console.log(this.mypower);
      //this.mypower = 10; -> Error: 안에서도 불가능!
    }
  }