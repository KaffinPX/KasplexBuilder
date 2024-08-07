import { addressFromScriptPublicKey, Opcodes, type ScriptBuilder } from "../../wasm"

export class Builder {
  script: ScriptBuilder

  constructor (script: ScriptBuilder) {
    this.script = script
  }

  create (publicKey: string, inscription: string) {
    this.script.drain()

    this.script
      .addData(publicKey)
      .addOp(Opcodes.OpCheckSig)
      .addOp(Opcodes.OpFalse)
      .addOp(Opcodes.OpIf)
      .addData(Buffer.from("kasplex"))
      .addI64(0n)
      .addData(Buffer.from(JSON.stringify(inscription, null, 0)))
      .addOp(Opcodes.OpEndIf);
  }

  createCommitAddress (networkId: string) {
    return addressFromScriptPublicKey(this.script.createPayToScriptHashScript(), networkId)!
  }

  encodeRevealSignature (signature: string) {
    return this.script.encodePayToScriptHashSignatureScript(signature)
  }
}