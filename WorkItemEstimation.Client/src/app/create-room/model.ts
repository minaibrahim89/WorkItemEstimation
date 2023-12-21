export class AllowedValuesSet {
  constructor(
    public name: string,
    public values: string[]) {
  }

  public display(): string {
    return `${this.name}: ${this.values.join(', ')}`;
  }
}

export const FIBONACCI: AllowedValuesSet = new AllowedValuesSet(
  'Fibonacci',
  ['1', '2', '3', '5', '8', '13', '21']
);

export const SHIRT_SIZES: AllowedValuesSet = new AllowedValuesSet(
  'Shirt sizes',
  ['XS', 'S', 'M', 'L', 'XL']
);
