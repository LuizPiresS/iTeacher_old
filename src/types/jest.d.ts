declare namespace jest {
  interface Matchers<R> {
    toBeCalledWithInstanceOf(instance: any): R;
  }

  interface Expect {
    toBeCalledWithInstanceOf(instance: any): any;
  }
}
