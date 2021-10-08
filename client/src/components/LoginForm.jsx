import React, { useState } from "react";
import styled from "styled-components";

const LoginFormContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0px;
  left: 370px;
  width: 350px;
  height: 100%;
  background-color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 50px;
`;

const Input = styled.input`
  all: unset;
  text-align: center;
  width: 300px;
  height: 3rem;
  margin-bottom: 50px;
  font-size: 16px;
  border-bottom: 1px solid black;
`;

const SubmitButton = styled.button`
  all: unset;
  display: block;
  text-align: center;
  width: 300px;
  height: 3rem;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: lightgray;
  font-size: 16px;
  &:hover {
    background-color: gray;
  }
`;

export default function LoginForm() {
  const handleChangeUserInput = (ev) => {
    const { name, value } = ev.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const [userInput, setUserInput] = useState({ email: "", password: "" });

  const handleSignUpClick = async () => {
    const res = await fetch("/api/auth/signup/", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    const _res = await res.json();
  };

  return (
    <LoginFormContainer>
      <Form>
        <Input
          type="text"
          name="email"
          value={userInput.email}
          placeholder="email을 입력하세요 : )"
          onChange={handleChangeUserInput}
        />
        <Input
          type="password"
          name="password"
          value={userInput.password}
          placeholder="비밀번호를 입력하세요 : )"
          onChange={handleChangeUserInput}
        />
        <SubmitButton>로그인</SubmitButton>
        <SubmitButton type="button" value="회원가입" onClick={handleSignUpClick}>
          회원가입
        </SubmitButton>
      </Form>
    </LoginFormContainer>
  );
}
