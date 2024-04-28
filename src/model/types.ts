export type GameData = {     
    added: number
    id: number
    background_image: string
    esrb_rating: { name: string }
    genres: [
        { name: string }
    ]
    name: string
    parent_platforms: Platforms[]
    platforms: Platforms[]
    rating: number
    ratings_count: number
    released: string
    slug: string
    short_screenshots: screenshot[]
    tags: {
        name: string
        language: string
    }[]
}

export type Platforms = {    
    platform: { name: string }
    requirements_ru: {
        minimum: string
        recommended: string
    }
}

export type screenshot = {
    image: string
}