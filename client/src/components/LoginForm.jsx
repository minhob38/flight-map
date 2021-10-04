import React, { useState } from "react";
import styled from "styled-components";;

const LoginFormContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0px;
  left: 370px;
  width: 350px;
  height: 100%;
  padding-top: 20px;
  background-color: orange;
`;

const Form = styled.form`
  display: flex;

`

const Input = styled.input`
  all: unset;
  display: block;
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  text-align: center;
  width: 300px;
  height: 3rem;
  background-color: white;
  font-size: 16px;
  border-bottom: 1px solid black;
`;

export default function LoginForm() {
  const handleChangeUserInput = (ev) => {
    const { name, value } = ev.target;
    setUserInput({...userInput, [name]: value})
  };

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  })

  return (
    <LoginFormContainer>
      <form>
        <Input
          name="email"
          type="text"
          placeholder="email을 입력하세요 : )"
          onChange={handleChangeUserInput}
          value={userInput.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요 : )"
          onChange={handleChangeUserInput}
          value={userInput.password}
        />
      </form>
    </LoginFormContainer>
  );
}