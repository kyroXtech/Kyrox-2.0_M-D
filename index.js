sock.ev.on('messages.upsert', async ({ messages }) => {
  const msg = messages[0]
  if (!msg.message) return
  const from = msg.key.remoteJid
  const text = msg.message.conversation || msg.message.extendedTextMessage?.text

  if (text === '.menu') {
    await sock.sendMessage(from, { text: `Bonjour Owner ${OWNER_NUMBER}, voici le menu.` })
  }
})
require('dotenv').config()
const { default: makeWASocket, useSingleFileAuthState } = require('@whiskeysockets/baileys')
const { Boom } = require('@hapi/boom')
const fs = require('fs')

const SESSION_FILE_PATH = './session.json'

const { state, saveState } = useSingleFileAuthState(SESSION_FILE_PATH)

const OWNER_NUMBER = '50935420142'

async function startBot() {
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
  })

  sock.ev.on('creds.update', saveState)

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update
    if (qr) {
      console.log('QR Code:', qr)
    }
    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect.error instanceof Boom) && lastDisconnect.error.output.statusCode !== 401
      console.log('Connexion fermée, reconnecte...', shouldReconnect)
      if (shouldReconnect) {
        startBot()
      } else {
        console.log('Déconnecté. Scanner le QR à nouveau.')
      }
    }
    if (connection === 'open') {
      console.log('Connecté avec succès !')
      console.log('Owner:', OWNER_NUMBER)
    }
  })

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
if (!msg.message) return
    const from = msg.key.remoteJid
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text

    if (text === '.menu') {
      await sock.sendMessage(from, { text: `Bonjour Owner ${OWNER_NUMBER}, voici le menu.` })
    }
  })
}

startBot()
