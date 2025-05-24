async function get(url: string, options?: RequestInit) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      ...options,
    })
    // 检查 HTTP 状态码
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    return res.json()
  }
  catch (error: any) {
    return {
      error: error?.message || `${url}:请求失败`,
    }
  }
}

async function post(url: string, options?: RequestInit) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      ...options,
    })
    return res.json()
  }
  catch (error: any) {
    return {
      error: error?.message || `${url}:请求失败`,
    }
  }
}

export const fetchData = {
  get,
  post,
}
