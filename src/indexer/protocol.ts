export interface IndexerResponse<T> {
  message: string
  result: T[]
}

export interface IndexerListResponse<T> extends IndexerResponse<T> {
  prev: string
  next: string
}

export type KRC20TokenListRequestParams = {
  next?: string
  prev?: string
  sort?: string
}

export interface KRC20TokenListResponse extends IndexerListResponse<{
  tick: string,
  max: string,
  lim: string,
  pre: string,
  to: string,
  dec: string,
  minted: string,
  opScoreAdd: string,
  opScoreMod: string,
  state: string,
  hashRev: string,
  mtsAdd: string
}> {}

export interface Balance {
  tick: string
  balance: string
  locked: string
  dec: string
  opScoreMod: string
}

export type KRC20BalanceRequestParams = {
  address: string
  tick: string
}

export interface KRC20BalanceResponse extends IndexerResponse<Balance> {}

export type KRC20BalancesRequestParams = {
  address: string
}

export interface KRC20BalancesResponse extends IndexerListResponse<Balance> {}