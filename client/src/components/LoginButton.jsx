import styled from "styled-components";
import { useDispatch } from "react-redux";
import * as actionCreators from "../reducers/authReducer";

const Button = styled.button`
  width: 100px;
  height: 100px;
`;

export default function LoginButton () {
  const dispatch = useDispatch()

  const onBtnClick = () => {
    console.log("button click")
    dispatch(actionCreators.loginClickAsync())
  }

  return <Button onClick={onBtnClick}>button</Button>
}