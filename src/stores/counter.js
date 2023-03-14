// 分别导入个个模块
import useCounterHome from './modules/home'

// 统一导出useStore方法
export default function useStore() {
  return {
    home: useCounterHome(),
  }
}
