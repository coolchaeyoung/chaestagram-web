import React from "react";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import BottomBox from "../components/auth/BottomBox";
import routes from "../routes";
import PageTitle from "../components/PageTitle";
import FormError from "../components/auth/FormError";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
    font-size: 12px;
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted(data) {
      const { ok, token } = data.login;
      if (!ok) {
        setError("result", {
          message: "Wrong Username or Password",
        });
        return;
      }
      logUserIn(token);
    },
  });

  const onSubmitValid = ({ username, password }) => {
    if (loading) {
      return;
    }
    login({ variables: { username, password } });
  };

  const setClearError = () => {
    if (errors?.result) {
      clearErrors("result");
      trigger();
    }
  };

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>

        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            type="text"
            placeholder="Username"
            {...register("username", {
              required: true,
              validate: setClearError,
            })}
          />

          <Input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
              validate: setClearError,
            })}
          />

          <Button
            type="submit"
            value={loading ? "Loading" : "Log in"}
            disabled={loading || !isValid}
          />
        </form>
        <Separator />
        <FormError message={errors?.result?.message} margin={"0 0 10px 0"} />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>

      <BottomBox
        cta="Don't have an account?"
        linkText="Sign up"
        link={routes.signUp}
      />
    </AuthLayout>
  );
};

export default Login;
