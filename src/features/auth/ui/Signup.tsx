import { useState } from "react";

import {
  Button,
  Field,
  Fieldset,
  Input,
  Flex,
  Heading,
} from "@chakra-ui/react";

import { postSignup } from "../api/postSignup";

const Signup = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 새로고침 방지
    const res = await postSignup({ userId: userId, password: password });
    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex minH="100vh" align="center" justify="center">
        <Fieldset.Root size="lg" maxW="md">
          <Flex justify="center">
            <Heading size="4xl">회원가입</Heading>
          </Flex>

          <Fieldset.Content>
            <Field.Root>
              <Field.Label>아이디</Field.Label>
              <Input
                name="userId"
                onChange={(e) => setUserId(e.target.value)}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>비밀번호</Field.Label>
              <Input
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>비밀번호 확인</Field.Label>
              <Input name="password-check" type="password" />
            </Field.Root>
          </Fieldset.Content>

          <Button w="full" type="submit" alignSelf="flex-start">
            회원가입
          </Button>
        </Fieldset.Root>
      </Flex>
    </form>
  );
};

export default Signup;
