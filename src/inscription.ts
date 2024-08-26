interface ScriptBuilder {
  drain: () => void
  addData: (data: string | Uint8Array) => ScriptBuilder
  addOp: (op: number) => ScriptBuilder
  addI64: (value: bigint) => ScriptBuilder
}

interface OperationMappings {
  "deploy": {
    tick: string
    max: string
    lim: string
    to: string
    dec?: string
    pre?: string
  }
  "mint": {
    tick: string
    to: string
  }
  "transfer": {
    tick: string
    amt: string
    to: string
  }
}

type InscriptionData<O extends keyof OperationMappings> = {
  p: string
  op: O
} & OperationMappings[O]

const encoder = new TextEncoder()

export class Inscription<O extends keyof OperationMappings> {
  data: InscriptionData<O>

  constructor (operation: O, params: OperationMappings[O]) {
    this.data = {
      'p': 'krc-20',
      'op': operation,
      ...params
    }
  }
  
  write (builder: ScriptBuilder, publicKey: string) {
    builder.drain()

    builder
      .addData(publicKey)
      .addOp(172) // OpCheckSig
      .addOp(0) // OpFalse
      .addOp(99) // OpIf
      .addData(encoder.encode("kasplex"))
      .addI64(0n)
      .addData(encoder.encode(this.toString()))
      .addOp(104); // OpEndIf
  }

  toString () {
    return JSON.stringify(this.data, null, 0)
  }
}