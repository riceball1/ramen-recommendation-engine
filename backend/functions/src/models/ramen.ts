import { Entity } from './entity'

type Ramen = {
    description: string
    imageUrl: string
    name: string
} & RamenMetadata & Entity

type RamenMetadata = {
    hasAllergen: 0 | 1
    isVegetarian: 0 | 1
    noodleType: 0 | 1
    price: number
    spicyLevel: number
}

export type {
    Ramen,
    RamenMetadata,
}
