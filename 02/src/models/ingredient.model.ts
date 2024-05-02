export class Ingredient {
  public id: number;

  constructor(public name: string, public amount: number) {
    this.id = Date.now() + Date.now();
  }
}
