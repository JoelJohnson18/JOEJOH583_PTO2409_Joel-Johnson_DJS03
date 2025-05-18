//Importing data from data.js
import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";

/**
 * Class with book list
 */

class BookList {
  /**
   * Creating a instance of BookList
   * @param {Array} books - List of books
   * @param {Object} authours - Dictionary of authors
   * @param {Object} genres - Dictionary of genres
   * @param {Number} booksPerPage - Number of books per page
   */

  constructor(books, authors, genres, booksPerPage) {
    this.books = books;
    this.authors = authors;
    this.genres = genres;
    this.booksPerPage = booksPerPage;
    this.page = 1;
    this.matches = books;
  }

  /**
   * Rendering books into HTML
   * @param {HTMLElement} targetElement - Element to render books into
   * @param {boolean} reset - Wheather to clear the target element before rendering
   * @param {number} startIndex - The start index of the books to render
   */

  renderBooks(targetElement, reset = false, startIndex = 0) {
    if (reset) targetElement.innerHTML = "";

    const fragment = document.createDocumentFragment();
    const slicedBooks = this.matches.slice(
      startIndex,
      startIndex + this.booksPerPage
    );

    for (const { author, id, image, title } of slicedBooks) {
      const bookElement = this.createBookElement({ author, id, title, image });
      fragment.appendChild(bookElement);
    }

    targetElement.appendChild(fragment);
  }

  /**
   * Create a preview element for a book
   * @param {string} id - The id of the book
   * @param {string} title - The title of the book
   * @param {string} image - The image of the book
   * @param {string} author - The author of the book
   * @returns {HTMLElement} - The preview element
   */

  createBookElement({ author, id, image, title }) {
    const element = document.createElement("button");
    element.classList.add("preview");
    element.setAttribute("data-preview", id);
    element.innerHTML = `
            <img class="preview__image" src="${image}" />
            <div class= "preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class= "preview__author">${this.authors[author]}</div>
                </div>
                `;

    return element;
  }

  /**
   * Filtering based on search filters
   * @param {Object} filters - The search filters(title, author, genre)
   */

  filterBooks(filters) {
    this.matches = this.books.filter((book) => {
      let genreMatch =
        filters.genre === "any" || book.genres.includes(filters.genre);
      return (
        (filters.title.trim() === "" ||
          book.title.toLowerCase().includes(filters.title.toLowercase())) &&
        (filters.author === "any" || book.author === filters.author) &&
        genreMatch
      );
    });

    this.page = 1;
  }

  /**
   * Load and render more books
   *
   */

  loadMoreBooks() {
    this.renderBooks(
      document.querySelector("[data-list-items]"),
      true,
      this.page * this.booksPerPage
    );

    this.page += 1;
  }
}

/**
 * Class for handling the UI
 * @extends BookList
 */

class BookUI extends BookList {
  /**
   * Creating the BookUI
   * @param {Array} books - List of books
   * @param {Object} authors - Dictionary of authors
   * @param {Object} genres - Dictionary of genres
   * @param {Number} booksPerPage - Number of books per page
   */

  constructor(books, authors, genres, booksPerPage) {
    super(books, authors, genres, booksPerPage);
    this.eventListeners();
    this.setupFilters();
    this.loadTheme(); // Load theme from localStorage on startup
  }
  /**
   * Event listeners for the UI
   */

  eventListeners() {
    document
      .querySelector("[data-list-button]")
      .addEventListener("click", () => {
        this.loadMoreBooks();
      });

    document
      .querySelector("[data-header-search]")
      .addEventListener("click", () => {
        this.toggleModal("[data-search-overlay]", true);
        document.querySelector("[data-search-title]").focus();
      });

    document
      .querySelector("[data-search-cancel]")
      .addEventListener("click", () => {
        this.toggleModal("[data-search-overlay]", false);
      });

    document
      .querySelector("[data-search-form]")
      .addEventListener("submit", (event) => {
        this.search(event);
      });

    document
      .querySelector("[data-header-settings]")
      .addEventListener("click", () => {
        this.toggleModal("[data-settings-overlay]", true);
      });

    document
      .querySelector("[data-settings-cancel]")
      .addEventListener("click", () => {
        this.toggleModal("[data-settings-overlay]", false);
      });

    document
      .querySelector("[data-list-close]")
      .addEventListener("click", () => {
        this.toggleModal("[data-list-active]", false);
      });

    document
      .querySelector("[data-list-items]")
      .addEventListener("click", (event) => {
        this.bookPreview(event);
      });

    document
      .querySelector("[data-settings-form]")
      .addEventListener("submit", (event) => {
        this.themeChange(event);
      });
  }

  /**
   * Opens and closes the modal
   * @param {boolean} state Whether its open or closed
   * @param {string} selector For the css selector of the modal
   */

  toggleModal(selector, state) {
    document.querySelector(selector).open = state;
  }

  /**
   * Populates dropdowns with genres and authors
   */

  setupFilters() {
    this.populateDropdown("[data-search-genres]", this.genres, "All Genres");
    this.populateDropdown("[data-search-authors]", this.authors, "All Authors");
  }

  /**
   * Populate dropdown menu
   * @param {string} selector - The css selector of the dropdown
   * @param {Object} data - The data to populate the dropdown with
   * @param {string} firstOption - The first option of the dropdown
   */

  populateDropdown(selector, data, firstOptionText) {
    const fragment = document.createDocumentFragment();
    const firstOption = document.createElement("option");
    firstOption.value = "any";
    firstOption.innertext = firstOptionText;
    fragment.appendChild(firstOption);

    for (const [id, name] of Object.entries(data)) {
      const option = document.createElement("option");
      option.value = id;
      option.innerText = name;
      fragment.appendChild(option);
    }

    document.querySelector(selector).appendChild(fragment);
  }

  /**
   * Search form submission handler
   * @param {Event} event - The form submission event
   */

  search(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);

    this.filterBooks(filters);
    this.renderBooks(document.querySelector("[data-list-items]"), true);
    document.querySelector("[data-search-overlay]").open = false;
  }

  /**
   * Book preview click event
   * @param {Event} event - The click event
   */

  bookPreview(event) {
    const previewId = event.target.closest("[data-preview]")?.dataset.preview;
    if (!previewId) return;

    const book = this.books.find((book) => book.id === previewId);
    if (!book) return;

    document.querySelector("[data-list-blur]").src = book.image;
    document.querySelector("[data-list-image]").src = book.image;
    document.querySelector("[data-list-title]").innerText = book.title;
    document.querySelector("[data-list-subtitle]").innerText =
      `${this.authors[book.author]} (${new Date(book.published).getFullYear()})`;
    document.querySelector("[data-list-description]").innerText =
      book.description;
    document.querySelector("[data-list-active]").open = true;
  }

  /**
   * Theme change
   * @param {Event} event - the theme change event
   */

  themeChange(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    this.applyTheme(theme);

    // Save the selected theme to localStorage
    localStorage.setItem("theme", theme);

    document.querySelector("[data-settings-overlay]").open = false;
  }
  loadTheme() {
    const savedTheme = localStorage.getItem("theme") || "day"; // Default to "day"
    this.applyTheme(savedTheme);

    // Set the dropdown value to the saved theme
    document.querySelector("[data-settings-theme]").value = savedTheme;
  }

  applyTheme(theme) {
    if (theme === "night") {
      document.documentElement.style.setProperty(
        "--color-dark",
        "255, 255, 255"
      );
      document.documentElement.style.setProperty("--color-light", "10, 10, 20");
    } else {
      document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
      document.documentElement.style.setProperty(
        "--color-light",
        "255, 255, 255"
      );
    }
  }
}

//Initialize UI

const bookUI = new BookUI(books, authors, genres, BOOKS_PER_PAGE);
bookUI.renderBooks(document.querySelector("[data-list-items]"));
