export type GameData = {     
    added: number
    id: number
    background_image: string
    esrb_rating: { name: string }
    genres: [
        { name: string }
    ]
    name: string
    platforms: Platforms[]
    rating: number
    ratings_count: number
    released: string
    short_screenshots: [
        { image: string }
    ]
}

export type Platforms = {
    platform: { name: string }
    requirements_ru: {
        minimum: string
        recommended: string
    }
}