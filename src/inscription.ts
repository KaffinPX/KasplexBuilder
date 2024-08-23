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

export class Inscription<O extends keyof OperationMappings> {
  data: InscriptionData<O>

  constructor (operation: O, params: OperationMappings[O]) {
    this.data = {
      'p': 'krc-20',
      'op': operation,
      ...params
    }
  }
  
  writeBuilder (builder: ScriptBuilder, publicKey: string) {
    builder.drain()

    builder
      .addData(publicKey)
      .addOp(172) // OpCheckSig
      .addOp(0) // OpFalse
      .addOp(99) // OpIf
      .addData(Buffer.from("kasplex"))
      .addI64(0n)
      .addData(Buffer.from(this.toString()))
      .addOp(104); // OpEndIf
  }

  toString () {
    return JSON.stringify(this.data, null, 0)
  }
}