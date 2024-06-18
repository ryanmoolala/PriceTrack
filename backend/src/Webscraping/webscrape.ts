import * as cheerio from "cheerio";
import axios from "axios";

const request = require("request");

const googleURL: string = "https://www.google.com/search?q=";
const yahooURL: string = "https://sg.finance.yahoo.com/quote/";

export const googleSearch = async (query: string): Promise<string> => {
  try {
    const url: string = `${googleURL}${encodeURIComponent(query)}`;
    const newsUrl: string = `${googleURL}${encodeURIComponent(query)}&tbm=nws`;

    // Make the request to fetch the HTML page
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    // Load HTML body into Cheerio
    const $ = cheerio.load(data);

    let href: string | undefined;
    // Filter elements based on class name 'wDYxhc'
    $('[jscontroller="GCSbhd"]').each((index, element) => {
      $(element)
        .find("a")
        .each((aIndex, aElement) => {
          href = $(aElement).attr("href");
          if (href) {
            return false; // Break the loop after finding the first href
          }
        });
      if (href) {
        return false; // Break the loop after finding the first href
      }
    });

    if (href) {
      try {
        const { data: wikiData } = await axios.get(href);
        const $$ = cheerio.load(wikiData);
        const secondParagraph = $$(".mw-content-ltr.mw-parser-output p")
          .eq(1)
          .text();
        return secondParagraph;
      } catch (fetchError) {
        console.error("Error fetching data from href:", fetchError);
        throw fetchError;
      }
    } else {
      console.log("No href found");
      return "";
    }
  } catch (error) {
    console.error("Error fetching Google search results:", error);
    throw error;
  }
};

export const topNewsSearch = async (query: string): Promise<string> => {
  try {
    const newsUrl: string = `${googleURL}${encodeURIComponent(query)}&tbm=nws`;
    const { data } = await axios.get(newsUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const $ = cheerio.load(data);

    $(".aUSklf").each((index, element) => {
      console.log(element);
    });
  } catch (error) {}
  return "";
};
