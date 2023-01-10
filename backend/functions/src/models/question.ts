import { Entity } from './entity'
import { RamenMetadata } from './ramen'

type Category = keyof RamenMetadata

type Question = {
    category: Category
    question: string
} & Entity

export type {
    Category,
    Question,
}
