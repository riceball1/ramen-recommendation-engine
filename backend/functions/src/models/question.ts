import { RamenMetadata } from './ramen'

type Category = keyof RamenMetadata

type Question = {
    category: Category
    question: string
}

export type {
    Category,
    Question,
}
