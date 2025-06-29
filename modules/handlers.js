import { sanitizeHTML } from './sanitize.js';
import { renderComments } from './render.js';

export function setupHandlers(comments) {
  const nameInput = document.querySelector('.add-form-name');
  const commentInput = document.querySelector('.add-form-text');
  const addButton = document.querySelector('.add-form-button');

  function attachLikeHandlers() {
    document.querySelectorAll('.like-button').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        const index = button.dataset.index;
        const comment = comments[index];
        comment.isLiked = !comment.isLiked;
        comment.likes += comment.isLiked ? 1 : -1;
        renderComments(comments);
        attachLikeHandlers();
        attachReplyHandlers();
      });
    });
  }

  function attachReplyHandlers() {
    document.querySelectorAll('.comment').forEach((el) => {
      el.addEventListener('click', () => {
        const index = el.dataset.index;
        const comment = comments[index];
        commentInput.value = `> ${comment.text}\n${comment.name},` ;
        commentInput.focus();
      });
    });
  }

  addButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const text = commentInput.value.trim();

    if (!name || !text) {
      alert('Пожалуйста, заполните оба поля');
      return;
    }

    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();

   comments.push({
  name: sanitizeHTML(name),
  date: `${dateString} ${timeString}`,
  text: sanitizeHTML(text),
  likes: 0,
  isLiked: false,
});

    nameInput.value = '';
    commentInput.value = '';

    renderComments(comments);
    attachLikeHandlers();
    attachReplyHandlers();
  });


  attachLikeHandlers();
  attachReplyHandlers();
}