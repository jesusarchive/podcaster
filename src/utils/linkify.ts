/**
 * Linkify text
 *
 * Replace URLs and emails in text with anchor tags.
 */
export function linkify(text: string): string {
  const urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const emailRegex = /([\w.]+@[\w.]+\.[\w]+)/g;

  return text
    .replace(urlRegex, (url) => {
      let hyperlink = url;
      if (!hyperlink.match('^https?://')) {
        hyperlink = `http://${hyperlink}`;
      }

      return `<a href="${hyperlink}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    })
    .replace(emailRegex, (email) => {
      return `<a href="mailto:${email}">${email}</a>`;
    });
}
