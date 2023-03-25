export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';
export const POST_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'GET_ORDER_FAILED';

export function getOrderData(ids) {
    const url = 'https://norma.nomoreparties.space/api/orders';
    const body = {"ingredients": ids}
    return function(dispatch) {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(res => {
            if (!res.ok) {
                dispatch({
                    type: POST_ORDER_FAILED
                });
            }
            return res.json();
        }).then(result => {
            if (result && result.success) {
                dispatch({
                    type: POST_ORDER_SUCCESS,
                    orderNumber: result.order.number
                });
            } else {
                dispatch({
                    type: POST_ORDER_FAILED
                });
            }
        }).catch(err => {
            dispatch({
                type: POST_ORDER_FAILED
            })
        })
    };
}