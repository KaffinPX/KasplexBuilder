interface OperationMappings {
  "mint": {
    "tick": string
    'to': string
  }
}

type InscriptionData<O extends keyof OperationMappings> = {
  p: string
  op: O
} & OperationMappings[O]

export class Inscription<O extends keyof OperationMappings> {
  data: InscriptionData<O>

  constructor (operation: O, params: OperationMappings[O]) {
    this.data = {
      'p': 'krc-20',
      'op': operation,
      ...params
    }
  }

  toString () {
    return JSON.stringify(this.data, null, 0)
  }
}