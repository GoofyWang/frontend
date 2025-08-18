import httpClient from '@/utils/request';
enum API {
    txCount = 'gettx',
    orderInfo = '/api/v2/spot/trade/orderInfo?orderId=1332517091602935811'
}

export const getTx = (data: any) => httpClient.get(API.txCount,data);
export const getOrderInfo = (data: any) => httpClient.get(API.orderInfo,data);
