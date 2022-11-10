import { request, uploadFile } from "../../src/api/api";

export async function getListForAdmin(filter) {
  return await request(`article/getList`, "POST",filter);
}
export async function update(article) {
  return await uploadFile(`article/updateArticle`, "POST", article);
}
export async function add(article) {
  return await uploadFile(`article/addArticle`, "POST", article);
}
export async function deleteArticle(id) {
  return await request(`article/deleteArticle/${id}`, "DELETE");
}
export async function updateBannerArticle(id) {
  return await request(`article/updateBannerArticle`, "POST",id);
}
export async function getListForWeb(filter) {
  const urlParams = new URLSearchParams(filter).toString()
  return await request(`article/getListForWeb?${urlParams}`, "GET");
}
export async function getArticleDetail(slugTitle) {
  return await request(`article/${slugTitle}`, "GET");
}
export async function getArticleById(articleId) {
  return await request(`article/getArticleById/${articleId}`, "GET");
}
export async function getLastArticles() {
  return await request(`article/getLastArticles`, "GET");
}