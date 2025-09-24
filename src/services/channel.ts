// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取规则列表 GET /api/rule */
export async function channelList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/channel', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function removeChannel(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/channel', {
    method: 'DELETE',
    data: {
      ...(options || {}),
    },
  });
}

export async function addChannel(channelForms: API.ChannelForm[]){
  return request<Record<string, any>>('/api/channel/batch', {
    method: 'POST',
    data: channelForms,
  });
}
