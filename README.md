# KasplexBuilder
An utility library for interaction with the Kasplex indexer and efficient creation of KRC20-compatible inscriptions on the Kaspa blockDAG.

## Usage

### Indexer
Use the Indexer to easily fetch KRC-20 token balances or other data from the Kasplex indexer API.

```tsx
import { Indexer } from 'KasplexBuilder'

const indexer = new Indexer('https://tn10api.kasplex.org')

const balances = await indexer.getKRC20Balances({
  address: "kaspatest:qqg2y3d2j7za64rqfl2ttrxnn4rhta79eq7qd0eepafxannj7yv2cuamkn44r"
})
```

### Inscription
With Inscription, you can create KRC-20 transfers or other token-related inscriptions and extract it as a Script.

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
Generate the commitment address using the created script.

```tsx
const commitAddress = addressFromScriptPublicKey(script.createPayToScriptHashScript(), 'TESTNET-10')!
```

#### Reveal
Sign the reveal transactions using the script and your private key.
With ``PendingTransactions[len - 1]`` via ``createTransactions``:

```tsx
const signature = transaction.createInputSignature(0, privateKey)
transaction.fillInput(0, script.encodePayToScriptHashSignatureScript(signature))  
```