export type ITokenPayload = {
    id: number;
    email: string;
  }
  
  export type ITokens = {
    accessToken: string;
    refresh_token: string;
  }

  export type ITokenPayloadAddRefresh = {
    user_id: number;
    refresh_token: string;
    expires_at: Date;
  }