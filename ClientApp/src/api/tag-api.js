import { request } from "../../src/api/api";

export async function getListForWeb() {
  return await request(`tag/getListForWeb`, "GET");
}
export async function getListForAdmin() {
  return await request(`tag/getListForAdmin`, "GET");
}
export async function update(tag) {
  return await request(`tag/updateTag`, "POST", tag);
}
export async function add(tag) {
  return await request(`tag/addTag`, "POST", tag);
}
export async function deleteTag(id) {
  return await request(`tag/deleteTag/${id}`, "DELETE");
}
