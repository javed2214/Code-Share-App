const redis = require('redis')
const redisPort = process.env.REDIS_PORT
const redisHost = process.env.REDIS_HOST
const redisClient = redis.createClient(redisPort, redisHost)

const connectRedis = () => {

    redisClient.on('error', () => {
        console.log('Error in Redis Connectivity!')
    })

    redisClient.on('connect', () => {
        console.log('Redis Connected Successfully!')
    })
}

module.exports = { connectRedis, redisClient }