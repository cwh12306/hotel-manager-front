import { request } from "$network/request";

export function getUser(username, password) {
  return request({
    url: "/hm/getUser",
    params: { username: username, password: password },
  });
}
