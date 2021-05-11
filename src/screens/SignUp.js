import React from "react";

import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import { FatLink } from "../components/shared";
import routes from "../routes";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router";
import FormError from "../components/auth/FormError";
import { isLoggedUserIn } from "../apollo";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      token
      error
    }
  }
`;

const SignUp = () => {
  const history = useHistory();
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

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted(data) {
      const { ok, error, token } = data.createAccount;
      if (!ok) {
        setError("result", {
          message: "Can't Sign In",
        });
        console.log(error);
        return;
      }
      isLoggedUserIn(token);
      history.push(routes.home);
    },
  });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    const { firstName, lastName, username, email, password } = data;
    createAccount({
      variables: { firstName, lastName, username, email, password },
    });
  };

  const setClearError = () => {
    if (errors?.result) {
      clearErrors("result");
      trigger();
    }
  };
  return (
    <AuthLayout>
      <PageTitle title={"Sign up"} />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            type="text"
            placeholder="First Name"
            {...register("firstName", {
              required: true,
              validate: setClearError,
            })}
          />
          <Input
            type="text"
            placeholder="Last Name"
            {...register("lastName", {
              required: true,
              validate: setClearError,
            })}
          />
          <Input
            type="text"
            placeholder="Username"
            {...register("username", {
              required: true,
              validate: setClearError,
            })}
          />
          <Input
            type="text"
            placeholder="Email"
            {...register("email", {
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
            value="Sign up"
            disabled={loading || !isValid}
          />
        </form>
        <FormError message={errors?.result?.message} margin={"10px 0 0 0"} />
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
};
export default SignUp;
