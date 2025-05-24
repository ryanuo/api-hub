import { fetchData } from '../../utils/fetchData'

export async function handleRoute() {
  const url = 'https://weibo.com/ajax/side/hotSearch'
  const result = await fetchData.get(url)
  const list = result.data?.realtime || []
  return {
    name: 'weibo',
    title: '微博',
    type: 'hot',
    description: '实时热点，每分钟更新一次',
    link: 'https://s.weibo.com/top/summary/',
    total: list?.length || 0,
    ...result,
    data: list.map((v: WeiboData) => {
      const key = v.word_scheme ? v.word_scheme : `#${v.word}`
      return {
        id: v.mid,
        title: v.word,
        desc: v.note || key,
        author: v.flag_desc,
        timestamp: v.onboard_time,
        hot: v.num,
        url: `https://s.weibo.com/weibo?q=${encodeURIComponent(key)}&t=31&band_rank=1&Refer=top`,
        mobileUrl: `https://s.weibo.com/weibo?q=${encodeURIComponent(key)}&t=31&band_rank=1&Refer=top`,
      }
    }),
  }
}
