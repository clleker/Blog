import {  message } from "antd";
import { apiUrl, uploadType } from "../helper/constant/api-constant";
import { HttpStatusCode } from "../helper/enums";

/**
 * @param uri {string} `/api/`den sonraki istek adresi
 * @param method {'GET' | 'POST' | 'PATCH' | 'DELETE'} request metot tipi
 */

export async function request(uri, method, body) {
  let token = localStorage.getItem("token");
  return await fetch(`${apiUrl}${uri}`, {
    method: method || "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + (token || ""),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
    .then((response) => handleResponse(response))
    .catch((error) => {
      message.error(error);
      console.error("Bir hata oluştu");
      throw error;
    });
}

//Excel vs gibi dosyaları export eder.
export async function downloadFile(uri, method, body, fileName = "") {
  let token = localStorage.getItem("token");

  return await fetch(`${apiUrl}${uri}`, {
    method: method || "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + (token || ""),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a); // we need to append the element to the dom -> firefox fallback
      a.click();
      a.remove();
    })
    .catch((error) => {
      message.error(error);
      console.error("Bir hata oluştu");
      throw error;
    });
}

const handleResponse = (response) => {
  switch (response.status) {
    case HttpStatusCode.Ok:
      return response.json();
   case HttpStatusCode.InternalServerError:
      message.error("Internal Server Error");
      break;
    case HttpStatusCode.Unauthorized:
      message.error("Yetkisiz Giriş");
      localStorage.removeItem("token")
      break;
    case HttpStatusCode.NotFound:
      message.error("SAYFA BULUNAMADİ");
      break;
    case HttpStatusCode.BadRequest:
      message.error("BAD REQUEST");
      break;
  }
};


export async function uploadFile(uri, method, file) {
  
  let token = localStorage.getItem("token");
  return await fetch(`${apiUrl}${uri}`, {
    method: method,
    headers: {
      Authorization: "Bearer " + (token || ""),
    },
    body: file,
  })
    .then((response) => handleResponse(response))
    .catch((error) => {
      message.error(error);
      console.error("Bir hata oluştu");
      throw error;
    });
}