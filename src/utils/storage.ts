import { getLocal } from '@daysnap/utils'

// 所有的数据存储到放到这里控制
export const userinfoStorage = getLocal().generate('$$USER_INFO')
