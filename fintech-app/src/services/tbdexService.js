import { TbdexHttpClient } from '@tbdex/http-client'

export const PFIs = [
  {
    name: 'AquaFinance Capital',
    did: 'did:dht:3fkz5ssfxbriwks3iy5nwys3q5kyx64ettp9wfn1yfekfkiguj1y',
    offerings: ['GHS to USDC', 'NGN to KES', 'KES to USD', 'USD to KES']
  },
  {
    name: 'Flowback Financial',
    did: 'did:dht:zkp5gbsqgzn69b3y5dtt5nnpjtdq6sxyukpzo68npsf79bmtb9zy',
    offerings: ['USD to EUR', 'EUR to USD', 'USD to GBP', 'USD to BTC']
  },
  {
    name: 'Vertex Liquid Assets',
    did: 'did:dht:enwguxo8uzqexq14xupe4o9ymxw3nzeb9uug5ijkj9rhfbf1oy5y',
    offerings: ['EUR to USD', 'EUR to USDC', 'USD to EUR', 'EUR to GB']
  },
  {
    name: 'Titanium Trust',
    did: 'did:dht:ozn5c51ruo7z63u1h748ug7rw5p1mq3853ytrd5gatu9a8mm8f1o',
    offerings: ['USD to AUD', 'USD to GBP', 'USD to KES', 'USD to MXN']
  }
]

class TBDEXService {
  constructor() {
    this.clients = PFIs.map(pfi => new TbdexHttpClient(pfi.did))
  }

  async getOfferings(fromCurrency, toCurrency) {
    const offerings = []
    for (const client of this.clients) {
      try {
        const pfiOfferings = await client.getOfferings()
        offerings.push(...pfiOfferings.filter(o => 
          o.payinCurrency === fromCurrency && o.payoutCurrency === toCurrency
        ))
      } catch (error) {
        console.error(`Error fetching offerings from ${client.pfi.name}:`, error)
      }
    }
    return offerings
  }

  async getVerifiableCredential(customerName, countryCode, customerDID) {
    const response = await fetch(`https://mock-idv.tbddev.org/kcc?name=${customerName}&country=${countryCode}&did=${customerDID}`)
    if (!response.ok) {
      throw new Error('Failed to obtain verifiable credential')
    }
    return await response.json()
  }
}

export default new TBDEXService()
