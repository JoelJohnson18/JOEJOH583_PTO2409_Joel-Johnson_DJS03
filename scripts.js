// Import data and initialize state
import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";

let page = 1;
let matches = books;

// Cache DOM elements
const listItems = document.querySelector("[data-list-items]");
const listButton = document.querySelector("[data-list-button]");
const listMessage = document.querySelector("[data-list-message]");
const searchOverlay = document.querySelector("[data-search-overlay]");
const settingsOverlay = document.querySelector("[data-settings-overlay]");

// Reusable function: create a book preview button
function createPreview({ author, id, image, title }) {
  const element = document.createElement("button");
  element.classList = "preview";
  element.setAttribute("data-preview", id);
  element.innerHTML = `
    <img class="preview__image" src="${image}" loading="lazy" />
    <div class="preview__info">
      <h3 class="preview__title">${title}</h3>
      <div class="preview__author">${authors[author]}</div>
    </div>
  `;
  return element;
}

// Reusable function: render a slice of books
function renderBookPreviews(books) {
  const fragment = document.createDocumentFragment();
  for (const book of books) {
    fragment.appendChild(createPreview(book));
  }
  listItems.appendChild(fragment);
}

// Reusable function: update "Show more" button
function updateShowMoreButton() {
  const remaining = Math.max(matches.length - page * BOOKS_PER_PAGE, 0);
  listButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${remaining})</span>
  `;
  listButton.disabled = remaining === 0;
}

// Reusable function: apply selected theme
function applyTheme(theme) {
  const dark = theme === "night";
  document.documentElement.style.setProperty(
    "--color-dark",
    dark ? "255, 255, 255" : "10, 10, 20"
  );
  document.documentElement.style.setProperty(
    "--color-light",
    dark ? "10, 10, 20" : "255, 255, 255"
  );
}

// Populate dropdown options
function populateDropdown(selector, options, defaultLabel) {
  const container = document.querySelector(selector);
  const fragment = document.createDocumentFragment();

  const defaultOption = document.createElement("option");
  defaultOption.value = "any";
  defaultOption.textContent = defaultLabel;
  fragment.appendChild(defaultOption);

  for (const [id, name] of Object.entries(options)) {
    const element = document.createElement("option");
    element.value = id;
    element.textContent = name;
    fragment.appendChild(element);
  }

  container.appendChild(fragment);
}

// Initial render
renderBookPreviews(matches.slice(0, BOOKS_PER_PAGE));
updateShowMoreButton();
populateDropdown("[data-search-genres]", genres, "All Genres");
populateDropdown("[data-search-authors]", authors, "All Authors");

// Apply system theme
applyTheme(
  window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "night" : "day"
);
document.querySelector("[data-settings-theme]").value = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches
  ? "night"
  : "day";

// Overlay event listeners
document.querySelector("[data-search-cancel]").addEventListener("click", () => {
  searchOverlay.open = false;
});

document
  .querySelector("[data-settings-cancel]")
  .addEventListener("click", () => {
    settingsOverlay.open = false;
  });

document.querySelector("[data-header-search]").addEventListener("click", () => {
  searchOverlay.open = true;
  document.querySelector("[data-search-title]").focus();
});

document
  .querySelector("[data-header-settings]")
  .addEventListener("click", () => {
    settingsOverlay.open = true;
  });

document.querySelector("[data-list-close]").addEventListener("click", () => {
  document.querySelector("[data-list-active]").open = false;
});

// Theme selection form
document
  .querySelector("[data-settings-form]")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);
    applyTheme(theme);
    settingsOverlay.open = false;
  });

// Search form submission
document
  .querySelector("[data-search-form]")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);

    matches = books.filter((book) => {
      const genreMatch =
        filters.genre === "any" || book.genres.includes(filters.genre);
      const titleMatch =
        filters.title.trim() === "" ||
        book.title.toLowerCase().includes(filters.title.toLowerCase());
      const authorMatch =
        filters.author === "any" || book.author === filters.author;
      return genreMatch && titleMatch && authorMatch;
    });

    page = 1;
    listMessage.classList.toggle("list__message_show", matches.length < 1);
    listItems.innerHTML = "";
    renderBookPreviews(matches.slice(0, BOOKS_PER_PAGE));
    updateShowMoreButton();

    window.scrollTo({ top: 0, behavior: "smooth" });
    searchOverlay.open = false;
  });

// Show more button logic
listButton.addEventListener("click", () => {
  renderBookPreviews(
    matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)
  );
  page++;
  updateShowMoreButton();
});

// Book detail modal
listItems.addEventListener("click", (event) => {
  const pathArray = event.composedPath();
  let active = null;

  for (const node of pathArray) {
    if (node?.dataset?.preview) {
      active = books.find((book) => book.id === node.dataset.preview);
      break;
    }
  }

  if (active) {
    const overlay = document.querySelector("[data-list-active]");
    overlay.open = true;
    document.querySelector("[data-list-blur]").src = active.image;
    document.querySelector("[data-list-image]").src = active.image;
    document.querySelector("[data-list-title]").textContent = active.title;
    document.querySelector("[data-list-subtitle]").textContent =
      `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
    document.querySelector("[data-list-description]").textContent =
      active.description;
  }
});
