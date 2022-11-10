import { request } from "../../src/api/api";

export async function getList() {
  return await request(`Subscribe/getList`, "GET");
}
export async function update(subcribe) {
  return await request(`subscribe/updateSubcribe`, "POST", subcribe);
}
export async function add(subscribe) {
  return await request(`subscribe/addSubscibe`, "POST", subscribe);
}
export async function deleteSubscriber(id) {
  return await request(`subscribe/deleteSubscribe/${id}`, "DELETE");
}
