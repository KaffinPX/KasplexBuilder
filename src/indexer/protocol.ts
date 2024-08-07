export type KRC20BalanceRequestParams = Record<'address' | 'tick', string>;

export interface KRC20BalanceResponse {
  tick: string
  balance: string
  locked: string
  dec: string
  opScoreMod: string
}