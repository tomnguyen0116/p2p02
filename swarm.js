import Hyperswarm from 'hyperswarm'
import crypto from 'crypto'
import b4a from 'b4a'
const swarm = new Hyperswarm()

// Swarms abstract away servers and clients and just gives you connections
swarm.on('connection', function (encryptedSocket) {
  console.log('New connection from', encryptedSocket.remotePublicKey.toString('hex'))

  encryptedSocket.write('Hello world!')
  process.stdin.pipe(encryptedSocket).pipe(process.stdout)

  encryptedSocket.on('data', function (data) {
    console.log('Remote peer said:', data.toString())
  })
  encryptedSocket.on('error', function (err) {
    console.log('Remote peer errored:', err)
  })
  encryptedSocket.on('close', function () {
    console.log('Remote peer fully left')
  })
})

// Topics are just identifiers to find other peers under
const topic = crypto.createHash('sha256').update('2 Insert a topic name here').digest()
const topicString = b4a.toString(topic, 'hex')
console.log(topicString)
swarm.join(topic)

