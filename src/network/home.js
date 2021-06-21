import { request } from "$network/request";

export function getRoomInfo() {
  return request({
    url: "/hm/getRoomInfo",
  });
}
