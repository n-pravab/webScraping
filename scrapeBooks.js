import { extractBooksDataFromPage } from "./extractBooksDataFromPage.js";
import { extractBookDetails } from "./extractBookDetails.js";
import { saveToCSV } from "./saveToCSV.js";

const scrapeBooks = async () => {
  let allBooks = [];

  for (let page = 1; page <= 3; page++) {
    console.log(`Scraping page ${page}...`);
    const booksOnPage = await extractBooksDataFromPage(page);

    for (const book of booksOnPage) {
      try {
        const details = await extractBookDetails(book.bookUrl);
        if (details) {
          const fullBookData = { ...book, ...details };
          allBooks.push(fullBookData);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error(`Page not found for URL: ${book.bookUrl}`);
        } else {
          console.error(
            `Error fetching details for URL: ${book.bookUrl}`,
            error
          );
        }
      }
    }
  }
  saveToCSV(allBooks);
};

scrapeBooks();
