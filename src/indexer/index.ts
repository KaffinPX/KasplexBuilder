import type { KRC20BalanceRequestParams, KRC20BalanceResponse, KRC20BalancesRequestParams, KRC20BalancesResponse, KRC20TokenListRequestParams, KRC20TokenListResponse } from './protocol'

type FetchFunction<P, R> = (params?: P) => Promise<R>

function buildFetchFunction <P extends Record<string, string | undefined>, R>(templateUrl: string): FetchFunction<P, R> {
  return async (params: P = {} as P) => {
    const url = templateUrl.replace(/{(\w+)}/g, (_, key) => {
      const value = params[key]
      if (!value) throw Error('Missing required parameter', key)

      delete params[key]
      return encodeURIComponent(value)
    })

    const optionalParams = Object.entries(params)
      .filter(([, value ]) => value !== undefined)
      .map(([ key, value ]) => `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`)
      .join('&')

    const response = await fetch(`${url}?${optionalParams}`)
    if (!response.ok) {
      throw new Error(`Error fetching data from indexer: ${response.statusText}`)
    }
    
    return await response.json() as Promise<R>
  }
}

export class Indexer {
  url: string

  constructor (url: string) {
    this.url = url
  }

  get getKRC20TokenList () {
    return buildFetchFunction<KRC20TokenListRequestParams, KRC20TokenListResponse>(`${this.url}/v1/krc20/tokenlist`)
  }

  get getKRC20Balances () {
    return buildFetchFunction<KRC20BalancesRequestParams, KRC20BalancesResponse>(`${this.url}/v1/krc20/address/{address}/tokenlist`)
  }

  get getKRC20Balance () {
    return buildFetchFunction<KRC20BalanceRequestParams, KRC20BalanceResponse>(`${this.url}/v1/krc20/address/{address}/token/{tick}`)
  }
}