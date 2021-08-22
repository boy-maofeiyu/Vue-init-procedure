/**
 * 本地存储操作封装
 */

/**
 * 添加本地存储对象
 */
export const setItem = (name, value) => {
  // 判断value类型
  if (typeof value === 'object') {
    // 转换成JSON格式
    value = JSON.stringify(value)
  }
  // 设置本地存储
  window.localStorage.setItem(name, value)
}

/**
 * 获取本地存储对象
 */
export const getItem = name => {
  // 获取本地存储对象
  const item = window.localStorage.getItem(name)
  // 判断是否能转换成对象
  try {
    return JSON.parse(item)
  } catch (e) {
    return item
  }
}
/**
 * 删除本地存储对象
 */
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
