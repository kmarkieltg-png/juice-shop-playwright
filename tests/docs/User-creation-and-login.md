# User creation 
## Acceptance criteria

### Registration page and password advice

1. **Open the registration page**
   - Given the user opens the registration flow
   - Then the User Registration page is displayed.

2. **Show password advice**
   - Given the user is on the User Registration page
   - When the user enables Show Password Advice
   - Then advice is shown for a lower-case character, an upper-case character, a digit, a special character, and a minimum of 8 characters.

3. **Hide password advice**
   - Given password advice is shown
   - When the user disables Show Password Advice
   - Then the password advice panel is hidden.

### Registration validation

1. **Reject a password shorter than 5 characters**
   - Given the password contains 4 characters
   - When the user enters otherwise valid registration details
   - Then the password length validation is shown in red and the Register button is disabled.

2. **Reject a password longer than 40 characters**
   - Given the password contains 41 characters
   - When the user enters otherwise valid registration details
   - Then the password length validation is shown in red and the Register button is disabled.

3. **Require a security answer**
   - Given the user leaves the security answer empty
   - When the user moves focus away from the field
   - Then the answer validation is shown and the Register button is disabled.

4. **Reject an invalid email address**
   - Given the email is `testmail`
   - When the user enters otherwise valid registration details
   - Then the email validation is shown and the Register button is disabled.

5. **Reject a malformed email address**
   - Given the email is `""`
   - When the user enters otherwise valid registration details
   - Then the user remains on the registration page and the email validation is shown.

6. **Reject registration with an email that is already registered**
   - Given an account has already been created with an email address
   - When the user submits registration again with that same address
   - Then the `Email must be unique` validation is shown.

7. **Require matching password values**
   - Given Password and Repeat Password contain different values
   - Then the mismatch is reported and the Register button is disabled.

8. **Require each registration field**
   - Given the user leaves Email, Password, Repeat Password, or Answer empty in turn
   - Then the Register button remains disabled and the relevant field validation is shown.

9. **Require a security question**
   - Given the user has entered all other required registration details but has not selected a security question
   - Then the Register button remains disabled.





