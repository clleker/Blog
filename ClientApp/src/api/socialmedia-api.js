import { request } from "../../src/api/api";

export async function getList() {
  return await request(`socialmedia/getList`, "GET");
}
export async function update(socialMedia) {
  return await request(`socialmedia/updateSocialMedia`, "POST", socialMedia);
}
export async function add(socialMedia) {
  return await request(`socialmedia/addSocialMedia`, "POST", socialMedia);
}
export async function deleteSocialMedia(id) {
  return await request(`socialmedia/deleteSocialMedia/${id}`, "DELETE");
}
