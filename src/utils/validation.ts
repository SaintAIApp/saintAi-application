export const validate = (
  name: string,
  value: string,
  errors: any,
  setErrors: any,
  credentials: any
) => {
  switch (name) {
    case "username":
      if (value.length < 3)
        setErrors({
          ...errors,
          [name]: "user name must be atleast 3 character long",
        });
      else if (value.length >= 20)
        setErrors({
          ...errors,
          [name]: "user name cannot exceed 20 characters",
        });
      else if (value.split(" ").length > 1)
        setErrors({ ...errors, [name]: "No space is allowed" });
      else setErrors({ ...errors, [name]: null });
      break;
    case "email": {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value))
        setErrors({
          ...errors,
          [name]: "invalid email",
        });
      else setErrors({ ...errors, [name]: null });
      break;
    }
    case "password":
      if (value.length < 3)
        setErrors({
          ...errors,
          [name]: "password must contain atleast 3 characters",
        });
      else if (value.length > 20)
        setErrors({
          ...errors,
          [name]: "password's length cannot exceed 20 characters",
        });
      else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        )
      )
        setErrors({
          ...errors,
          [name]:
            "password must contain a lowercase, uppercase and a special character",
        });
      else
        setErrors({
          ...errors,
          [name]: null,
        });
      break;
    case "confirmpassword":
      if (value != credentials.password)
        setErrors({
          ...errors,
          [name]: "value doesn't match with password",
        });
      else
        setErrors({
          ...errors,
          [name]: null,
        });
      break;
    case "otp":
      if (value.length != 6 || !/^\d{6}$/.test(value))
        setErrors({
          ...errors,
          [name]: "Invalid OTP",
        });
      else setErrors({ ...errors, [name]: null });
      break;
    default:
      return;
  }
};
