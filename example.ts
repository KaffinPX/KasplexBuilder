import { Indexer } from './'

const indexer = new Indexer('https://tn11api.kasplex.org')
const balance = await indexer.getKRC20Balance({ address: "kaspatest:qz3egpx877sqfd0t2xtxnqdta26qma26hahkx8zg8xdyypnt7xp05j70axmqr", tick: "TNACHO" })

console.log(balance.result)