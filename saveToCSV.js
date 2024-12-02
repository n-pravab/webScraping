import fs from "fs";

export const saveToCSV = (books) => {
  const productInfoKeys = new Set();

  books.forEach((book) => {
    Object.keys(book.productInfo).forEach((key) => productInfoKeys.add(key));
  });

  const productInfoKeysArray = Array.from(productInfoKeys).sort();

  const header = [
    "Book Name",
    "Price",
    "Rating",
    "Breadcrumbs",
    "Product Description",
    ...productInfoKeysArray,
  ];

  const rows = books.map((book) => {
    const row = {
      "Book Name": book.bookName,
      Price: book.price,
      Rating: book.rating,
      Breadcrumbs: book.category,
      "Product Description": book.description,
    };

    productInfoKeysArray.forEach((key) => {
      row[key] = book.productInfo[key] || "N/A";
    });

    return row;
  });

  const csvContent = [
    header.map((key) => `"${key}"`).join(","),
    ...rows.map((row) =>
      header.map((key) => `"${(row[key] || "").replace(/"/g, '""')}"`).join(",")
    ),
  ].join("\n");

  fs.writeFileSync("books_data.csv", csvContent, "utf8");
  console.log("Data saved to books_data.csv");
};
