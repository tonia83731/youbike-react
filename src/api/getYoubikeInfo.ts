import axios from 'axios'

const taipeiBaseURL =
  'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json'
export const getTaipeiBikeInfo = async () => {
  try {
    const res = await axios.get(taipeiBaseURL)
    return res.data
  } catch (error) {
    console.error('[Get Taipei bike info failed]:', error)
  }
}