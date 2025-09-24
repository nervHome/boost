// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取规则列表 GET /api/rule */
export async function epglList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.EpgListItem>('/api/epg', {
    method: 'GET',
    params: {
      ...params,
       ...(options || {}),
    },
  });
}

export async function removeEpg(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/epg', {
    method: 'DELETE',
    data: {
      ...(options || {}),
    },
  });
}
export async function addEpg(epgForm: API.EpgForm){
  return request<Record<string, any>>('/api/epg', {
    method: 'POST',
    data: epgForm,
  });
}

export async function updateEpg(epgForm: API.EpgForm){
  return request<Record<string, any>>('/api/epg', {
    method: 'PUT',
    data: epgForm,
  });
}
