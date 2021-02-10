import api from './apiConfig'

export const fetchHomepageGames = async () => {
    const resp = await api.get('/igdb/homepagedata')
    console.log('/api/igdb/homepagedata req finished: ', resp)
    return resp.data

}

// export const fetchGamepageGame = async (gameid) => {
//   console.log('game was fetched ')
//   const resp = await api.get('/igdb/gamepagedata', {
//     params: {
//       gameid: gameid
//   }})
//   console.log('/api/igdb/gamepagedata req finished: ', resp)
//   return resp.data
// }

