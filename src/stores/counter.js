// 分别导入个个模块
import useCounterHome from './modules/home'
import usePlaylist from './modules/playlist'
import useSeach from './modules/search'
// 统一导出useStore方法
export default function useStore() {
  return {
    home: useCounterHome(),
    playlist: usePlaylist(),
    search: useSeach(),
  }
}
