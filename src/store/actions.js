export default {
  setResturantNameByAsync: function(context, payload) {
    setTimeout(() => {
      context.commit('setResturantName', payload); //Action提交的是mutation
    }, 3000);
  },
	setResultChcIdByAsync: function(context, payload) {
		setTimeout(() => {
			context.commit('setResultChcId', payload); //Action提交的是mutation
		}, 1000);
	}
}
