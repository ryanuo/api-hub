interface JueJinData {
  content: {
    content_id: string
    title: string
    name: string
  }
  author: {
    name: string
  }
  content_counter: {
    hot_rank: number
  }
}

interface QQNewData {
  id: string
  title: string
  abstract: string
  miniProShareImage: string
  source: string
  hotEvent: {
    hotScore: number
  }
}

interface WeiboData {
  mid: string
  word: string
  note: string
  flag_desc: string
  onboard_time: number
  num: number
  word_scheme: string
}

interface DataMap {
  juejin: JueJinData[]
  qqnew: QQNewData[]
  weibo: WeiboData[]
}
