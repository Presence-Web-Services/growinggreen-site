<script>
let form, email, message, hp;
let emailError, messageError, hpError;
let responseError, responseSuccess;
let sending;
$: disabled = emailError || messageError || hpError || responseError || sending;

function checkEmail() {
  if (!email) {
    emailError = 'Error: Please enter an email.';
    return;
  }
  else if (email.length < 5 || email.length > 50) {
    emailError = 'Error: Email is too short or too long.';
    return;
  }
  let emailRegex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
  if (!emailRegex.test(email)) {
    emailError = 'Error: Email is not a valid format.';
    return;
  }
}

function checkMessage() {
  if (!message) {
    messageError = 'Error: Please enter a message.';
    return;
  }
  else if (message.length > 2000) {
    messageError = 'Error: Message is too long.';
    return;
  }
}

function checkHP() {
  if (hp) {
    hpError = 'Error: Please, no robots!';
  }
}

function clearFields() {
  email = message = hp = "";
}

function sendData() {
  const xhr = new XMLHttpRequest();
  const formData = new FormData(form);
  xhr.addEventListener('load', (event) => {
    if (event.target.status != 200) {
      responseError = event.target.responseText.trim();
    } else {
      responseSuccess = event.target.responseText.trim();
      clearFields();
    }
    sending = false;
  });
  xhr.addEventListener('error', (event) => {
    responseError = 'Error: No response from server.'
    sending = false;
  });
  xhr.open('POST', '/inquire/');
  xhr.send(formData);
}

function sendEmail(event) {
  emailError = messageError = hpError = responseError = responseSuccess = "";
  sending = true;
  checkEmail();
  checkMessage();
  checkHP();
  if (emailError || messageError || hpError) {
    sending = false;
    return;
  }
  sendData();
}

function emailChange() {
  emailError = responseError = "";
}

function messageChange() {
  messageError = responseError = "";
}

function hpChange() {
  hpError = responseError = "";
}

</script>

<form bind:this={form}>
  <label for="email">Email (required):</label>
  <input type="email" id="email" name="email" size="33" maxlength="50" placeholder="name@email.com" required bind:value={email} on:input={emailChange}>
  <label for="message">Message (required):</label>
  <textarea id="message" name="message" rows="12" cols="33" maxlength="2000" placeholder="How can we help you care for your surroundings?" required bind:value={message} on:input={messageChange}></textarea>
  <input id="hp" name="hp" bind:value={hp} on:input={hpChange}>
  <button on:click|preventDefault={sendEmail} {disabled}>Send</button>
</form>
{#if emailError}
  <p aria-live="polite" class="error">{emailError}</p>
{/if}
{#if messageError}
  <p aria-live="polite" class="error">{messageError}</p>
{/if}
{#if hpError}
  <p aria-live="polite" class="error">{hpError}</p>
{/if}
{#if responseError}
  <p aria-live="polite" class="error">{responseError}</p>
{/if}
{#if responseSuccess}
  <p aria-live="polite" class="success">{responseSuccess}</p>
{/if}

<style>
/* #email_article {
  height: 100%;
  display: flex;
  flex-direction: column;
}
#email_article h1 {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  flex: 0 0 auto;
}
#email_article form {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#email, #message {
  font-size: inherit;
  margin-bottom: 0.5em;
  width: 90%;
  min-width: 18em;
  max-width: 33em;
}
#email {
  text-align: center;
  border-radius: 2%/30%;
}
#message {
  padding: 1em;
  flex: 1 0 auto;
  border-radius: 2%/3%;
}
@media (min-width: 75em) {
  #message {
    font-size: 1rem;
  }
} */
form * {
  display: block;
}
form input, form textarea {
  box-sizing: border-box;
  padding: 0.3em;
  margin: 0 0 1em;
  font-size: 1em;
  font-family: monospace;
  max-width: calc(100% - 2em);
  width: 22rem;
}
#email_article form button {
  width: 6em;
  height: 3em;
  border-radius: 5%/20%;
}
#email_article form button:disabled {
  background-color: #cccccc;
  color: black;
}
#hp {
  visibility: hidden;
  height: 0;
  width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}
p.error {
  color: red;
}
p.success {
  color: green;
}
</style>
