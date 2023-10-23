import React from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import { postRegister } from "../service/auth";

export type FormValue = {
  username: string;
  nickname: string;
  password: string;
  password_check: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>({ mode: "onChange" });

  const password = watch("password");

  const onSubmit = async (data: FormValue) => {
    const formData = {
      username: data.username,
      nickname: data.nickname,
      password: data.password,
    };

    try {
      // 서버로 데이터 전송
      const responseData = await postRegister(formData);
      console.log("회원가입 성공:", responseData);
    } catch (error) {
      console.error("회원가입 오류:", error);
    }
  };
  console.log(errors);
  if (process.env.REACT_APP_AXIOS_API === undefined) {
    console.error("REACT_APP_AXIOS_API 환경 변수가 설정되지 않았습니다.");
  } else {
    console.log("REACT_APP_AXIOS_API 값:", process.env.REACT_APP_AXIOS_API);
  }
  return (
    <StContainer>
      <StForm onSubmit={handleSubmit((data) => onSubmit(data))}>
        <StLabel>ID</StLabel>
        <StInput
          {...register("username", {
            pattern: /^[a-z0-9]{4,16}$/,
            required: "필수로 입력하셔야 합니다.",
          })}
        />
        {errors.username && errors.username.type === "required" && (
          <StError>{errors.username.message}</StError>
        )}
        {errors.username && errors.username.type === "pattern" && (
          <StError>영어와 숫자를 조합하여 4~16글자로 입력하세요</StError>
        )}
        <StLabel>NICKNAME</StLabel>
        <StInput
          {...register("nickname", {
            pattern: /^[a-zA-Z0-9\u0000-\uFFFF]{2,5}$/,
            required: "필수로 입력하셔야 합니다.",
          })}
        />
        {errors.nickname && errors.nickname.type === "required" && (
          <StError>{errors.nickname.message}</StError>
        )}
        {errors.nickname && errors.nickname.type === "pattern" && (
          <StError>2~5글자를 입력하세요!</StError>
        )}

        <StLabel>PASSWORD</StLabel>
        <StInput
          type="password"
          {...register("password", {
            minLength: 6,
            maxLength: 20,
            required: "필수로 입력하셔야 합니다.",
          })}
        />
        {errors.password && errors.password.type === "required" && (
          <StError>{errors.password.message}</StError>
        )}
        {errors.password &&
          errors.password.type === ("minLength" || "maxLength") && (
            <StError>6~20글자 사이로 입력하세요</StError>
          )}

        <StLabel>PASSWORD CHECK</StLabel>
        <StInput
          type="password"
          {...register("password_check", {
            validate: (value) =>
              value === password || "비밀번호가 일치하지 않습니다.",
            required: "필수로 입력하셔야 합니다.",
          })}
        />
        {errors.password_check && errors.password_check.type === "required" && (
          <StError>{errors.password_check.message}</StError>
        )}
        {errors.password_check && errors.password_check.type === "validate" && (
          <StError>{errors.password_check.message}</StError>
        )}
        <StButton disabled={Object.keys(errors).length > 0}>전송</StButton>
      </StForm>
    </StContainer>
  );
}
const StContainer = styled.section``;
const StForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const StInput = styled.input`
  max-width: 15rem;
`;
const StLabel = styled.label`
  margin-top: 1rem;
`;
const StError = styled.p`
  color: red;
  font-size: 0.8rem;
`;
const StButton = styled.button``;
