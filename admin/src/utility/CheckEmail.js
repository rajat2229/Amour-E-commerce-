


const CheckEmail = (email)=>{
  const regex = /^([_\-.0-9a-zA-Z]+)@([_\-.0-9a-zA-Z]+)(\.)([a-zA-Z]){2,7}$/;
  const test = regex.test(email);
  return test;
}

export default CheckEmail;