import * as cheerio from "cheerio";
import { fetchHTML } from "./fetchHTML.js";

export const extractBookDetails = async (bookUrl) => {
  const html = await fetchHTML(bookUrl);
  if (!html) return null;
  const $ = cheerio.load(html);
  console.log("Scraping book details from:", bookUrl);

  const breadcrumbs = $(".breadcrumb li")
    .map((index, element) => $(element).text().trim())
    .get()
    .slice(1)
    .join(" > ");
  const category = breadcrumbs.split(" > ")[1] || "No category available";

  const description =
    $("#product_description + p").text().trim() || "No description available";

  const productInfo = {};
  $("#content_inner table tr").each((index, element) => {
    const key = $(element).find("th").text().trim();
    const value = $(element).find("td").text().trim();
    if (key && value) {
      productInfo[key] = value;
    }
  });

  return { category, description, productInfo };
};
