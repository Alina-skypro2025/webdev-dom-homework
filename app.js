import { comments } from './modules/comments.js';
import { renderComments } from './modules/render.js';
import { setupHandlers } from './modules/handlers.js';

renderComments(comments);
setupHandlers(comments);