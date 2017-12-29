import cloneDeep from 'lodash/cloneDeep';
import extend from 'lodash/extend'

function testReducer(state = {}, action) {
	let  newState = cloneDeep(state);

	switch (action.type){
		case 'click':
			return extend(newState,{name : 'reduxTest click'})
		case 'showName':
			return extend(newState,{nameTest : 'reduxTest  展示name'})
		default:
			return state
	}
}

export { testReducer }