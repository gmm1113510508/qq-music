/*修改state值*/
import state from './state'
export default {
	addSongList(state, parms) {
		state.songList = parms
	},
	changeIndexdetail(state, parms) {
		state.nowIndex = parms
	},
	changeShow(state) {
		state.show = !state.show
		console.log(state.show);

	},
	changeIndex(state, parms) {
		// 边界判断
		if(parms == 'next') {
			if(state.nowIndex >= state.songList.length - 1) {
				state.nowIndex = 0
			} else {
				state.nowIndex++
			}
			// state.nowIndex++
		} else if(parms == 'prev') {
			//state.nowIndex--
			if(state.nowIndex <= 0) {
				state.nowIndex = state.songList.length - 1
			} else {
				state.nowIndex--
			}
		}
	}
}