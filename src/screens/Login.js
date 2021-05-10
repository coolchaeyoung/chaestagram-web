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
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted({ login }) {
      if (login.error) {
        setError("result", {
          message: login.error,
        });
      }
    },
  });

  const onSubmitValid = ({ username, password }) => {
    if (loading) {
      return;
    }
    login({ variables: { username, password } });
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
            hasError={Boolean(errors?.username?.message)}
            {...register("username", {
              required: true,
              minLength: {
                value: 5,
                message: "Username should be longer than 5 chars",
              },
            })}
          />
          <FormError message={errors?.username?.message} />

          <Input
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
            {...register("password", { required: "Password is required" })}
          />
          <FormError message={errors?.password?.message} />

          <Button
            type="submit"
            value={loading ? "Loading" : "Log in"}
            disabled={loading || !isValid}
          />
          <FormError message={errors?.result?.message} />
        </form>
        <Separator />

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
