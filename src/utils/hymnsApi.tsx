export interface HymnSummary {
  title: string;
  number: number;
}

export interface Hymns {
  hymns: HymnSummary[];
  currentPage: number;
  totalPages: number;
}

export interface Hymn {
  title: string;
  verses: Verse[];
  author: string;
  number: number;
}

export interface Verse {
  sequence: number;
  lyrics: string;
  chorus: boolean;
}

export interface HymnResponse {
  hymn: Hymn;
  prevHymn: HymnSummary | null;
  nextHymn: HymnSummary | null;
}

export class HymnsApi {
  private static API_URL = "https://harpa-api.glitch.me/hymns";

  private static async fetchHymns(endpoint: string = "/") {
    const response = await fetch(`${this.API_URL}${endpoint}`);
    return response.json();
  }

  static async getHymns(page: number = 1): Promise<Hymns> {
    return this.fetchHymns(`/?page=${page}`);
  }

  static async getHymn(number: number): Promise<HymnResponse> {
    return this.fetchHymns(`/${number}`);
  }

  static async getRandomHymn(): Promise<HymnResponse> {
    return this.fetchHymns("/random");
  }

  static async searchHymns(
    query: string,
    type: "title" | "verse" | "number" = "number",
    page: number = 1
  ): Promise<Hymns> {
    return this.fetchHymns(`/search/${type}/${query}?page=${page}`);
  }
}
