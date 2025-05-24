import { fetchData } from '../../utils/fetchData'

export async function handleRoute() {
  const listData = await getList()
  const routeData = {
    name: 'qq-news',
    title: '腾讯新闻',
    type: '热点榜',
    link: 'https://news.qq.com/',
    total: listData.data?.length || 0,
    ...listData,
  }
  return routeData
}

async function getList() {
  const url = `https://r.inews.qq.com/gw/event/hot_ranking_list?page_size=50`
  const result = await fetchData.get(url)
  const list = result?.idlist[0].newslist.slice(1)
  return {
    ...result,
    data: list?.map((v: QQNewData) => ({
      id: v.id,
      title: v.title,
      desc: v.abstract,
      cover: v.miniProShareImage,
      author: v.source,
      hot: v.hotEvent.hotScore,
      timestamp: 1,
      url: `https://new.qq.com/rain/a/${v.id}`,
      mobileUrl: `https://view.inews.qq.com/k/${v.id}`,
    })),
  }
}
