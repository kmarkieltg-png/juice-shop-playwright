# Login

## Acceptance criteria



1. **Log in with valid credentials**
   - Given an existing account that does not require a second factor
   - When the user enters the account's email and matching password and submits the form
   - Then the login succeeds and the user is redirected to `/search`.

2. **Return to the requested page after login**
   - Given a `redirectUrl` query parameter is present on the login page
   - When the user logs in with valid credentials
   - Then the user is redirected to the URL specified by `redirectUrl` instead of `/search`.

3. **Keep login disabled when credentials are incomplete**
   - Given either the email or password is empty
   - Then the Login button is disabled.

4. **Reject an incorrect password**
   - Given an account exists for the entered email
   - When the user enters an incorrect password and submits the form
   - Then login is rejected, the user remains unauthenticated, and `Invalid email or password.` is shown.

5. **Reject an email with no account**
   - Given no account exists for the entered email
   - When the user submits the email and a password
   - Then login is rejected, the user remains unauthenticated, and `Invalid email or password.` is shown.

6. **Do not submit incomplete credentials**
   - Given either the email or password field is empty
   - Then the Login button is disabled.

7. **Reject invalid credentials**
   - Given the email is not associated with an account or the password does not match the account
   - When the user submits the credentials
   - Then login is rejected, the user remains unauthenticated, and the login page displays `Invalid email or password.`.

8. **Register and log in with valid details**
   - Given the user registers with valid details
   - When the user logs in with the same email and password
   - Then the user is redirected to `/search` and the account menu shows their email address.

9. **Reject a malformed login email**
   - Given the user enters `'` as the email and a password
   - When the user submits the login form
   - Then the user remains on the login page and sees `Invalid email or password.`
   - Note: the spec records a bug where the form displays `[object Object]` instead of a user-friendly validation message for special characters.