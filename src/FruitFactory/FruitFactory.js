class Fruit {
  constructor(
    fruitName,
    fruitCroppingTime,
    fruitCrop,
    fruitPrice,
    fieldMultiplier,
    positionX,
    positionY,
  ) {
    this.fruitName = fruitName;
    this.fruitCroppingTime = fruitCroppingTime;
    this.fruitCrop = fruitCrop;
    this.fruitPrice = fruitPrice;
    this.fieldMultiplier = fieldMultiplier;
    this.positionX = positionX;
    this.positionY = positionY;
  }
}

export const fruitFactory = [
  new Fruit('Truskawka', 120, 4, 0.48, 1, '20%', '0%'),
  new Fruit('Pomidor', 140, 4, 0.56, 1, '40%', '-0.1%'),
  new Fruit('Szpinak', 560, 4, 2.1, 1, '49.78%', '7.6%'),
  new Fruit('Cebula', 480, 4, 1.85, 1, '80.3%', '-0.2%'),
  new Fruit('Kalafior', 1000, 4, 4.1, 1, '9.7%', '7.6%'),
  new Fruit('Ziemniak', 960, 4, 4, 1, '9.9%', '5%'),
  new Fruit('Czosnek', 1320, 4, 5.1, 1, '40%', '7.65%'),
  new Fruit('Papryka', 2400, 5, 8, 1, '40%', '2.5%'),
  new Fruit('Brokuł', 1200, 4, 4.95, 1, '20%', '7.6%'),
  new Fruit('Oberżyna', 2880, 5, 9.5, 1, '60.3%', '0%'),
  new Fruit('Cukinia', 2880, 4, 11, 1, '50%', '2.5%'),
  new Fruit('Malina', 2880, 5, 8.2, 1, '90.4%', '0%'),
  new Fruit('Jagoda', 1920, 6, 5.45, 1, '30%', '7.7%'),
  new Fruit('Słonecznik', 300, 3, 1.85, 1, '70.5%', '10.2%'),
  new Fruit('Nagietki', 360, 4, 2, 1, '80.5%', '10.3%'),
  new Fruit('Jeżyna', 2880, 3, 28.5, 1, '70.5%', '-0.1%'),
  new Fruit('Porzeczka', 2160, 6, 6.4, 1, '-.2%', '2.5%'),
  new Fruit('Rzodkiewka', 50, 3, 0.24, 1, '30%', '2.5%'),
  new Fruit('Ogórek', 40, 4, 0.14, 1, '10%', '2.5%'),
  new Fruit('Mirabelka', 8640, 10, 56, 4, '60%', '2.5%'),
  new Fruit('Róża', 420, 2, 4.1, 1, '90.5%', '10.2%'),
  new Fruit('Szparagi', 2520, 5, 9.5, 2, '90.5%', '2.5%'),
  new Fruit('Sałata', 14, 2, 0.8, 1, '9.7%', '-0.1%'),
  new Fruit('Jabłka', 5760, 12, 55, 4, '30%', '-0.1%'),
  new Fruit('Dynia', 8640, 6, 55, 1, '70%', '2.5%'),
];
