import React from "react";
import { useNavigate } from "react-router-dom";
import SignUp from "../components/SignUp";

export default function HomePage() {
  const navigation = useNavigate();
  return (
    <>
      <SignUp />
      <h1>오델로 페이지</h1>
      <button onClick={() => navigation("/lobby")}>로비로 이동하기</button>
    </>
  );
}
