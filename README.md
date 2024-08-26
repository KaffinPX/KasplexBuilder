# KasplexBuilder
Utility library for interacting with Kasplex indexer and creating inscriptions.

## Usage

### Indexer

```tsx
import { Indexer } from 'KasplexBuilder'

const indexer = new Indexer('https://tn10api.kasplex.org')

const balances = await indexer.getKRC20Balances({
  address: "kaspatest:qqg2y3d2j7za64rqfl2ttrxnn4rhta79eq7qd0eepafxannj7yv2cuamkn44r"
})
```

### Inscription

```tsx
import { ScriptBuilder, addressFromScriptPublicKey } from './wasm'
import { Inscription } from 'KasplexBuilder'

const script = new ScriptBuilder()
const inscription = new Inscription('transfer', {
  tick: ticker,
  amt: BigInt(1e8).toString(), // 1 token with 8 decimals
  to: recipient.toString()
})

inscription.write(script, XOnlyPublicKey.fromAddress(address).toString())
```

#### Commitment

```tsx
const commitAddress = addressFromScriptPublicKey(script.createPayToScriptHashScript(), 'TESTNET-10')!
```

#### Reveal

With ``PendingTransaction[len - 1]`` via ``createTransactions``:

```tsx
const signature = transaction.createInputSignature(0, privateKey)
transaction.fillInput(0, script.encodePayToScriptHashSignatureScript(signature))  
```