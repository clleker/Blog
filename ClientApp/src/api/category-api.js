import { request } from "../../src/api/api";

export async function getList() {
    return await request(`category/getListForWeb`, "GET");
  }
  export async function getListForAdmin() {
    return await request(`category/getListForAdmin`, "GET");
  }
  export async function update(category) {
    return await request(`category/updateCategory`, "POST", category);
  }
  export async function add(category) {
    return await request(`category/addCategory`, "POST", category);
  }
  export async function deleteCategory(id) {
    return await request(`category/deleteCategory/${id}`, "DELETE");
  }
  
  