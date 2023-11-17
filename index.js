import axios from "axios";
import cheerio from "cheerio";
import express from "express";

const PORT = process.env.PORT || 5000;

const app = express();

axios("https://www.manchestereveningnews.co.uk/sport/football/")
  .then((res) => {
    const htmlData = res.data;
    const $ = cheerio.load(htmlData);
    const articles = [];

    const teaserElements = $(".teaser"); // Select all elements with class "teaser"

    teaserElements.each((index, element) => {
      const title = $(element).find(".headline").text();
      const titleUrl = $(element).find(".headline").attr("href");

      articles.push({
        title,
        titleUrl,
      });
    });

    console.log(articles);
  })
  .catch((err) => console.error(err));

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
