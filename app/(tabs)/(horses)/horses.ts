export type Horse = {
  id?: number;
  number?: number;
  name?: string;
  birthDate?: string;
  microchip?: number;
  isPregnant?: boolean;
  gestationDays: number;
  currentDays: number;
  imageUrl?: string;
  bornDate?: string;
  race?: string;
  location?: string;
  category?: string;
  weight?: number;
  passport?: string;
  hair?: string;
  gender: string;
  father?: Horse;
  mother?: Horse;
  paternalGrandfather?: Horse;
  paternalGrandmother?: Horse;
  maternalGrandfather?: Horse;
  maternalGrandmother?: Horse;
};

export const horses: Record<number, Horse> = {
  6002326: {
    id: 6002326,
    name: "Amy Down Ryon (Panzona)",
    bornDate: "7 marzo de 2019",
    birthDate: "5A 6M 2D",
    microchip: 933000320656141,
    isPregnant: true,
    gestationDays: 340,
    currentDays: 300,
    race: "Apalosa",
    hair: "IDK",
    passport: "3453esdadsfg",
    location: "Racho Mezquite",
    category: "Semental",
    weight: 150,
    imageUrl:
      "https://www.fullbuckethealth.com/cdn/shop/articles/FullBucket_Horse_Age_Chart_800x.jpg?v=1597367323",
    gender: "female",
    father: {
      id: 123456,
      name: "Ryon Down",
      birthDate: "10A 3M 15D",
      microchip: 933000320123456,
      isPregnant: false,
      gestationDays: 0,
      currentDays: 0,
      imageUrl: "https://horseimages.com/ryon.jpg",
      gender: "male",
    },
    mother: {
      id: 654321,
      name: "Amy's Dream",
      birthDate: "12A 1M 10D",
      microchip: 933000320654321,
      isPregnant: false,
      gestationDays: 0,
      currentDays: 0,
      imageUrl: "https://horseimages.com/amysdream.jpg",
      gender: "female",
    },
    paternalGrandfather: {
      id: 112233,
      name: "Dream Ryon",
      birthDate: "20A 2M 30D",
      microchip: 933000321112233,
      isPregnant: false,
      gestationDays: 0,
      currentDays: 0,
      imageUrl: "https://horseimages.com/dreamryon.jpg",
      gender: "male",
    },
    paternalGrandmother: {
      id: 332211,
      name: "Ryon's Lady",
      birthDate: "19A 4M 22D",
      microchip: 933000321332211,
      isPregnant: false,
      gestationDays: 0,
      currentDays: 0,
      imageUrl: "https://horseimages.com/ryonslady.jpg",
      gender: "female",
    },
    maternalGrandfather: {
      id: 445566,
      name: "Amy's Star",
      birthDate: "22A 3M 18D",
      microchip: 933000321445566,
      isPregnant: false,
      gestationDays: 0,
      currentDays: 0,
      imageUrl: "https://horseimages.com/amysstar.jpg",
      gender: "male",
    },
    maternalGrandmother: {
      id: 665544,
      name: "Starry Night",
      birthDate: "21A 5M 25D",
      microchip: 933000321665544,
      isPregnant: false,
      gestationDays: 0,
      currentDays: 0,
      imageUrl: "https://horseimages.com/starrynight.jpg",
      gender: "female",
    },
  },
  933000123456789: {
    id: 933000123456789,
    name: "Bastet",
    birthDate: "5A 6M 2D",
    microchip: 933000320656141,
    isPregnant: true,
    gestationDays: 340,
    currentDays: 270,
    imageUrl:
      "https://www.fullbuckethealth.com/cdn/shop/articles/FullBucket_Horse_Age_Chart_800x.jpg?v=1597367323",
    gender: "male",
    father: {
      id: 123456,
      name: "Ryon Down",
      birthDate: "10A 3M 15D",
      microchip: 933000320123456,
      isPregnant: false,
      gestationDays: 0,
      currentDays: 0,
      imageUrl: "https://horseimages.com/ryon.jpg",
      gender: "male",
    },
    mother: {
      id: 654321,
      name: "Amy's Dream",
      birthDate: "12A 1M 10D",
      microchip: 933000320654321,
      isPregnant: false,
      gestationDays: 0,
      currentDays: 0,
      imageUrl: "https://horseimages.com/amysdream.jpg",
      gender: "female",
    },
    paternalGrandfather: {
      id: 112233,
      name: "Dream Ryon",
      birthDate: "20A 2M 30D",
      microchip: 933000321112233,
      isPregnant: false,
      gestationDays: 0,
      currentDays: 0,
      imageUrl: "https://horseimages.com/dreamryon.jpg",
      gender: "male",
    },
    paternalGrandmother: {
      id: 332211,
      name: "Ryon's Lady",
      birthDate: "19A 4M 22D",
      microchip: 933000321332211,
      isPregnant: false,
      gestationDays: 0,
      currentDays: 0,
      imageUrl: "https://horseimages.com/ryonslady.jpg",
      gender: "female",
    },
    maternalGrandfather: {
      id: 445566,
      name: "Amy's Star",
      birthDate: "22A 3M 18D",
      microchip: 933000321445566,
      isPregnant: false,
      gestationDays: 0,
      currentDays: 0,
      imageUrl: "https://horseimages.com/amysstar.jpg",
      gender: "male",
    },
    maternalGrandmother: {
      id: 665544,
      name: "Starry Night",
      birthDate: "21A 5M 25D",
      microchip: 933000321665544,
      isPregnant: false,
      gestationDays: 0,
      currentDays: 0,
      imageUrl: "https://horseimages.com/starrynight.jpg",
      gender: "female",
    },
  },
  // Agrega más caballos si es necesario
};
