import './quiz.scss';

import { i18next, t } from '@/i18n';
import { sendLead } from '@/api/lead';
import { PHONE_DIGITS, formatPhone, phoneDigits } from '@/utils/phone';

export function initQuiz() {
  const root = document.querySelector('.quiz');
  if (!root) return;

  const form = root.querySelector('.quiz__form');
  const steps = [...form.querySelectorAll('.quiz__step')];
  const progress = root.querySelector('[data-quiz-progress]');
  const back = form.querySelector('.quiz__back');
  const next = form.querySelector('.quiz__next');
  const actions = form.querySelector('.quiz__actions');
  const nameInput = form.elements.name;
  const phoneInput = form.elements.phone;
  const errorBox = form.querySelector('.form-error');
  const submitBtn = form.querySelector('.quiz__submit');

  const last = steps.length - 1;
  let current = 0;

  const renderProgress = () => {
    progress.textContent = t('quiz.progress', { current: current + 1, total: steps.length });
  };

  const show = (index, { focus = true } = {}) => {
    current = index;
    steps.forEach((step, i) => (step.hidden = i !== index));
    const isFinal = index === last;
    back.hidden = index === 0 || isFinal;
    actions.hidden = isFinal;
    root.classList.toggle('is-final', isFinal);
    renderProgress();
    if (focus) steps[index].querySelector('input')?.focus({ preventScroll: true });
  };

  const showError = (key) => {
    errorBox.textContent = key ? t(`quiz.errors.${key}`) : '';
    errorBox.hidden = !key;
  };

  next.addEventListener('click', () => current < last && show(current + 1));
  back.addEventListener('click', () => current > 0 && show(current - 1));

  phoneInput.addEventListener('input', () => {
    phoneInput.value = formatPhone(phoneInput.value);
    phoneInput.classList.remove('is-invalid');
    showError(null);
  });
  nameInput.addEventListener('input', () => {
    nameInput.classList.remove('is-invalid');
    showError(null);
  });

  const collectAnswers = () =>
    steps.slice(0, last).map((step) => {
      const checked = step.querySelector('input:checked');
      return {
        question: step.querySelector('.quiz__question').textContent.trim(),
        key: checked.name,
        value: checked.value,
        answer: checked.closest('label').textContent.trim(),
      };
    });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Enter на промежуточном шаге = «Следующий вопрос»
    if (current < last) {
      show(current + 1);
      return;
    }

    const name = nameInput.value.trim();
    const digits = phoneDigits(phoneInput.value);

    if (!name) {
      nameInput.classList.add('is-invalid');
      showError('name');
      nameInput.focus();
      return;
    }
    if (digits.length !== PHONE_DIGITS) {
      phoneInput.classList.add('is-invalid');
      showError('phone');
      phoneInput.focus();
      return;
    }

    submitBtn.disabled = true;
    form.setAttribute('aria-busy', 'true');
    try {
      await sendLead({
        source: 'quiz',
        lang: i18next.language,
        city: localStorage.getItem('city') || 'almaty',
        name,
        phone: `+7${digits}`,
        answers: collectAnswers(),
      });
      root.classList.add('is-sent');
      form.hidden = true;
      progress.hidden = true;
      root.querySelector('.quiz__done').hidden = false;
    } catch {
      showError('send');
    } finally {
      submitBtn.disabled = false;
      form.removeAttribute('aria-busy');
    }
  });

  // текст прогресса собирается в js (с подстановкой чисел), поэтому обновляем при смене языка сами
  i18next.on('languageChanged', () => {
    renderProgress();
    showError(null);
  });

  show(0, { focus: false });
}
