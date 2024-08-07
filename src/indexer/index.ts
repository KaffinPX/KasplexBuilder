import type { KRC20BalanceRequestParams, KRC20BalanceResponse } from './protocol'

type FetchFunction<P, R> = (params: P) => Promise<R>

function buildFetchFunction <P extends Record<string, string>, R>(templateUrl: string): FetchFunction<P, R> {
  return async (params: P) => {
    const url = templateUrl.replace(/{(\w+)}/g, (_, key) => {
      return encodeURIComponent(params[key])
    })

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Error fetching data from indexer: ${response.statusText}`)
    }

    return (await response.json())['result'] as Promise<R>
  }
}

export class Indexer {
  url: string

  constructor (url: string) {
    this.url = url
  }

  get getKRC20Balance () {
    return buildFetchFunction<KRC20BalanceRequestParams, KRC20BalanceResponse>(`${this.url}/v1/krc20/address/{address}/token/{tick}`)
  }
}