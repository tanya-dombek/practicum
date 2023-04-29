import { AppThunk } from "../../types/types";
import { BASE_URL } from '../../utils/rests-utils';
import { request } from '../../utils/rests-utils';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

export type TOrderAction =
  | { type: typeof CLOSE_ORDER_MODAL }
  | { type: typeof POST_ORDER_SUCCESS, orderNumber: number }
  | { type: typeof POST_ORDER_FAILED };

export const getOrderData = (ids: string[]): AppThunk => {
    const url = BASE_URL + '/orders';
    const body = {"ingredients": ids}
    return function(dispatch) {
      request(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
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