import { formatPathParams } from '@daysnap/utils'
import type { CurlOptions } from './types'
import { instance } from './instance'

export function curl<T = any>(
  url: string,
  data: Record<string, any> = {},
  options: CurlOptions = {},
): Promise<T> {
  const { method } = (options = Object.assign(
    {
      method: 'get',
    },
    options,
  ))

  ;({ path: url, rest: data } = formatPathParams(url, data))
  options.url = url
  options[method === 'get' ? 'params' : 'data'] = data

  // return instance[adapter]
  return null as any
}
