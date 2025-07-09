// src/api.js
const baseUrl = 'http://localhost:3001/books';

export const fetchBooks = async () => {
  const res = await fetch(baseUrl);
  return await res.json();
};

export const addBook = async (book) => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  });
  return await res.json();
};

export const deleteBook = async (name) => {
  await fetch(`${baseUrl}/${encodeURIComponent(name)}`, {
    method: 'DELETE'
  });
};

export const rateBook = async (name, rating) => {
  const res = await fetch(`${baseUrl}/${encodeURIComponent(name)}/rate`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rating })
  });
  return await res.json();
};