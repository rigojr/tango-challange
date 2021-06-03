// ENTITIES

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// FATHERS

export interface IRtkState {
  loading: boolean;
  error: string;
}