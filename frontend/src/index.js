(() => {
  const wakeButton = document.querySelector('.wake-button');
  const message = document.querySelector('.message');
  const messageHeader = document.querySelector('.message-header');
  const messageBody = document.querySelector('.message-body');

  const showMessage = (msgType, title, content) => {
    message.classList.add(`is-${msgType}`);
    messageHeader.innerText = title;
    messageBody.innerText = content;

    message.classList.remove('is-hidden');
  };

  wakeButton.addEventListener('click', (evt) => {
    wakeButton.classList.add('is-loading');

    fetch('./api/wake', {
      method: 'POST',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((response) => {
        const text = `Command exited with code ${response.exitCode}:\n${response.output}`;
        if (response.exitCode === 0) {
          showMessage('success', 'Success', text);
        } else {
          showMessage('danger', 'Error', text);
        }
      })
      .catch((err) => {
        showMessage('danger', 'Error', err.toString());
      })
      .finally(() => {
        wakeButton.classList.add('is-hidden');
      });
  });
})();
