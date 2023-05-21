import { AppThunk } from '../../types/types';
import { BASE_URL } from '../../utils/rests-utils';
import { request } from '../../utils/rests-utils';
import { TOrder } from '../../types/feed-orders-types';
export const GET_ORDER_DETAILS_SUCCESS: 'GET_ORDER_DETAILS_SUCCESS' = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILED: 'GET_ORDER_DETAILS_FAILED' = 'GET_ORDER_DETAILS_FAILED';

export type TOrderDetailsAction =
  | { type: typeof GET_ORDER_DETAILS_SUCCESS, orderDetails: TOrder }
  | { type: typeof GET_ORDER_DETAILS_FAILED }

export function getOrderDetails(orderNumber?: string): AppThunk {
    const url = BASE_URL + '/orders/' + orderNumber;
    return function(dispatch) {
      request(url, {method: 'GET'}).then(result => {
        
            if (result && result.success) {
                dispatch({
                    type: GET_ORDER_DETAILS_SUCCESS,
                    orderDetails: result.orders[0]
                });
            } else {
                dispatch({
                    type: GET_ORDER_DETAILS_FAILED
                });
            }
        }).catch(err => {
            dispatch({
                type: GET_ORDER_DETAILS_FAILED
            })
        })
    };
}
