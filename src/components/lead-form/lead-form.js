import './lead-form.scss';

import { i18next, t } from '@/i18n';
import { sendLead } from '@/api/lead';
import { PHONE_DIGITS, formatPhone, phoneDigits } from '@/utils/phone';

// Форма «имя / телефон / комментарий». Подключается на любой секции через
// <include src="src/components/lead-form/lead-form.html"></include>;
// источник заявки — data-lead-source на родителе (request, contacts…).
export function initLeadForms() {
  document.querySelectorAll('.lead-form').forEach(initForm);
}

function initForm(form) {
  const source = form.closest('[data-lead-source]')?.dataset.leadSource || 'form';
  const { name: nameInput, phone: phoneInput, comment: commentInput } = form.elements;
  const errorBox = form.querySelector('.form-error');
  const submitBtn = form.querySelector('.lead-form__submit');
  let errorKey = null;

  const showError = (key) => {
    errorKey = key;
    errorBox.textContent = key ? t(`leadForm.errors.${key}`) : '';
    errorBox.hidden = !key;
  };

  phoneInput.addEventListener('input', () => {
    phoneInput.value = formatPhone(phoneInput.value);
    phoneInput.classList.remove('is-invalid');
    showError(null);
  });
  nameInput.addEventListener('input', () => {
    nameInput.classList.remove('is-invalid');
    showError(null);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

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
        source,
        lang: i18next.language,
        city: localStorage.getItem('city') || 'almaty',
        name,
        phone: `+7${digits}`,
        comment: commentInput.value.trim(),
      });
      form.classList.add('is-sent');
      form.querySelector('.lead-form__done').hidden = false;
    } catch {
      showError('send');
    } finally {
      submitBtn.disabled = false;
      form.removeAttribute('aria-busy');
    }
  });

  // текст ошибки переводится при смене языка
  i18next.on('languageChanged', () => errorKey && showError(errorKey));
}
