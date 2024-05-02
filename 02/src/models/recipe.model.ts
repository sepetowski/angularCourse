export class Recipe {
  public id: number;

  constructor(
    public name: string,
    public description: string,
    public imagePath: string | null
  ) {
    this.id = Date.now() + Date.now();
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
  }
}
