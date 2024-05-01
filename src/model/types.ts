export type GameData = {
  added: number;
  id: number;
  background_image: string;
  esrb_rating: { name: string };
  genres: [{ name: string }];
  name: string;
  parent_platforms: Platforms[];
  platforms: Platforms[];
  rating: number;
  ratings_count: number;
  released: string;
  slug: string;
  short_screenshots: screenshot[];
  tags: {
    name: string;
    language: string;
  }[];
};

export type Platforms = {
  platform: { name: string };
  requirements_ru: {
    minimum: string;
    recommended: string;
  };
};

export type screenshot = {
  image: string;
};

export type Filters = {
  platforms: string;
  tags: string;
  ordering: string;
  genres: string;
};

export type MaskFilters = {
  [key: string]: boolean;
}

export const initialStateFilters = {
    Multiplayer: false,
    Singleplayer: false,
    PC: false,
    Xbox: false,
    PlayStation: false,
    Linux: false,
    MAC: false,
    Action: false,
    Indie: false,
    Adventure: false,
    RPG: false,
    Strategy: false,
    Shooter: false,
    Casual: false,
    Simulation: false,
    Puzzle: false,
    Arcade: false,
    Platformer: false,
    Racing: false,
    Sports: false,
    Fighting: false,
    Family: false,
    Card: false,
    'Max rating': false
}