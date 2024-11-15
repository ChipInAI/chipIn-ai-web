type HomePageData = {
  recommendations: Array<{
    Bars: number;
    Burgers: number;
    Chinese: number;
    GoodForKids: number;
    HasTV: number;
    Indian: number;
    Irish: number;
    Italian: number;
    Japanese: number;
    Mexican: number;
    NoiseLevel: number;
    OutdoorSeating: number;
    Pizza: number;
    RestaurantsGoodForGroups: number;
    RestaurantsPriceRange2: number;
    RestaurantsReservations: number;
    RestaurantsTakeOut: number;
    Sandwiches: number;
    Seafood: number;
    Steakhouses: number;
    Thai: number;
    WiFi: number;
    alcohol: number;
    attire: number;
    casual: number;
    classy: number;
    divey: number;
    hipster: number;
    intimate: number;
    review_count: number;
    romantic: number;
    stars: number;
    touristy: number;
    trendy: number;
    upscale: number;
  }>;
  previous_sessions: Array<{
    _id: string;
    admin_id: string;
    created_at: string;
    participants: string[];
    receipt: Array<Array<string>>;
    session_name: string;
    session_positions: Array<
      | {
          buyer: string;
          item_name: string;
          price: number;
        }
      | unknown
    >;
    status: string;
    total: number;
  }>;
};

export type { HomePageData };
