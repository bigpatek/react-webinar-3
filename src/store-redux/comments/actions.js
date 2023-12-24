export default {
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущих комментариев и установка признака ожидания загрузки
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });
        // Комментарии загружены успешно
        dispatch({type: 'comments/load-success', payload: {data: res.data.result}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/load-error', payload: {e}});
      }
    };
  },

  postComment: ({text, parent, userName}) => {
    return async (dispatch, getState, services) => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await services.api.request({
					url: '/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type)',
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'X-Token': token,
					},
					body: JSON.stringify({
						text,
            parent
					}),
				});
				dispatch({
					type: 'comments/post-comment',
					payload: { data: res.data.result },
				});
      } catch (e) {
        dispatch({type: 'comments/load-error', payload: e.message});
      }
    }
  }
};