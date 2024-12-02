import * as cheerio from "cheerio";
import { fetchHTML } from "./fetchHTML.js";

const BASE_URL = "https://books.toscrape.com/";

export const extractBooksDataFromPage = async (pageNumber) => {
  const url = `${BASE_URL}catalogue/page-${pageNumber}.html`;
  const html = await fetchHTML(url);
  if (!html) return [];

  const $ = cheerio.load(html);
  const books = [];

  $(".product_pod").each((index, element) => {
    const relativeUrl = $(element).find("h3 a").attr("href");
    const bookUrl = BASE_URL + "catalogue/" + relativeUrl;

    const bookName = $(element).find("h3 a").attr("title");
    const price = $(element).find(".price_color").text();
    const rating = $(element).find("p.star-rating").attr("class").split(" ")[1];
    books.push({ bookUrl, bookName, price, rating });
  });
  return books;
};
