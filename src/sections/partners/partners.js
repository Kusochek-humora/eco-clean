import './partners.scss';

// Бесконечная бегущая строка: копию списка добавляем в конец трека (css сдвигает трек на -50%).
// Копия скрыта от скринридеров и не берёт фокус.
export function initPartners() {
  const track = document.querySelector('.partners__track');
  const group = track?.querySelector('.partners__group');
  if (!group) return;

  const clone = group.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  clone.querySelectorAll('img').forEach((img) => {
    img.alt = '';
    img.loading = 'eager'; // копия появляется в кадре сразу после первой, без «пустого» места
  });
  track.append(clone);
  track.classList.add('is-running');
}
