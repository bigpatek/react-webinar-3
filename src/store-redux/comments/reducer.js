export const initialState = {
  data: {
    items: [],
    count: 0,
  },
  waiting: false,
  error: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return {...state, data: initialState.data, waiting: true, error: ""};

    case 'comments/load-success':
      return {...state, data: action.payload.data || initialState.data, waiting: false, error: ""};

    case 'comments/load-error':
      return {...state, data: initialState.data, waiting: false, error: action.payload.error.message};

    case 'comments/post-comment':
      return {...state, data: action.payload.data || initialState.data, waiting: false, error: ""};

    default:
      return state;
  }
}

export default reducer;
