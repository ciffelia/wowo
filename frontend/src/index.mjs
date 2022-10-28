const wakeButton = document.querySelector('.wake-button');
const message = document.querySelector('.message');
const messageHeader = document.querySelector('.message-header');
const messageBody = document.querySelector('.message-body');

wakeButton.addEventListener('click', async () => {
  wakeButton.classList.add('is-loading');

  try {
    const resp = await fetch('./api/wake', {
      method: 'POST',
    });
    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status} ${resp.statusText}`);
    }

    const result = await resp.json();
    const text = `Command exited with code ${result.exitCode}:\n${result.output}`;
    if (result.exitCode === 0) {
      showSuccessMessage(text);
    } else {
      showErrorMessage(text);
    }
  } catch (err) {
    showErrorMessage(err.toString());
  } finally {
    wakeButton.classList.add('is-hidden');
  }
});

const showSuccessMessage = (content) => {
  showMessage('success', 'Success', content);
};

const showErrorMessage = (content) => {
  showMessage('danger', 'Error', content);
};

const showMessage = (msgType, title, content) => {
  message.classList.add(`is-${msgType}`);
  messageHeader.innerText = title;
  messageBody.innerText = content;

  message.classList.remove('is-hidden');
};
