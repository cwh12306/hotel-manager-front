import { request } from "$network/request";

export function getGuestInfo(phone) {
  return request({
    url: "/hm/getGuestInfo",
    params: { phone: phone },
  });
}
export function getAllGuestInfo() {
  return request({
    url: "/hm/getAllGuestInfo",
  });
}
export function removeConsumer(id, rno) {
  return request({
    url: "/hm/removeConsumer",
    params: { id: id, rno: rno },
  });
}
