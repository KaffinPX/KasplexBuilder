import { getKRC20Balance } from '../'

const balance = await getKRC20Balance({ address: "kaspatest:qz3egpx877sqfd0t2xtxnqdta26qma26hahkx8zg8xdyypnt7xp05j70axmqr", tick: "TNACHO" })
console.log(balance)