export interface IndexerResponse<T> {
  message: string
  result: T[]
}

export interface IndexerListedResponse<T> extends IndexerResponse<T> {
  prev: string
  next: string
}

export interface Token {
  tick: string
  max: string
  lim: string
  pre: string
  to: string
  dec: string
  minted: string
  opScoreAdd: string
  opScoreMod: string
  state: string
  hashRev: string
  mtsAdd: string
}

export interface TokenWithHolders extends Token {
  holder: { 
    address: string
    amount: string
  }[]
}

export interface Balance {
  tick: string
  balance: string
  locked: string
  dec: string
  opScoreMod: string
}

export type KRC20TokenListRequestParams = {
  next?: string
  prev?: string
  sort?: string
}

export interface KRC20TokenListResponse extends IndexerListedResponse<Token> {}

export type KRC20InfoRequestParams = {
  tick: string
}

export interface KRC20InfoResponse extends IndexerResponse<TokenWithHolders> {}

export type KRC20BalanceRequestParams = {
  address: string
  tick: string
}

export interface KRC20BalanceResponse extends IndexerResponse<Balance> {}

export type KRC20BalancesRequestParams = {
  address: string
}

export interface KRC20BalancesResponse extends IndexerListedResponse<Balance> {}