import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { useUserContext } from "../../context/UserContext";
import { postLogin } from "../../service/auth";
import { UserLogin } from "../../types";
import LoginInput from "./LoginInput";

const initialUserState = { username: "", password: "" };
export default function LoginForm() {
  const { setIsLogin, setUserInfo } = useUserContext();
  const [user, setUser] = useState<UserLogin>(initialUserState);
  const navigation = useNavigate();
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await postLogin(user);
      setIsLogin(true);
      setUserInfo({ username: data.username, nickname: data.nickname });
      navigation("/lobby");
    } catch (error) {
      alert("오류발생");
    }
  };
  return (
    <StContainer>
      <StForm onSubmit={onSubmitHandler}>
        <LoginInput
          onChangeHandler={onChangeHandler}
          name="username"
          label="ID"
        />
        <LoginInput
          onChangeHandler={onChangeHandler}
          name="password"
          label="PW"
        />

        <StButtonWrap>
          <StButton>로그인</StButton>
          <StButton type="button">회원가입</StButton>
        </StButtonWrap>
      </StForm>
    </StContainer>
  );
}

const StContainer = styled.section``;

const StForm = styled.form``;

const StButtonWrap = styled.div``;
const StButton = styled.button``;
