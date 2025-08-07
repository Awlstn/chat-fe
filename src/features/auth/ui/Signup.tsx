import {
  Button,
  Field,
  Fieldset,
  Input,
  Flex,
  Heading,
} from "@chakra-ui/react";

const Signup = () => {
  return (
    <Flex minH="100vh" align="center" justify="center">
      <Fieldset.Root size="lg" maxW="md">
        <Flex justify="center">
          <Heading size="4xl">회원가입</Heading>
        </Flex>

        <Fieldset.Content>
          <Field.Root>
            <Field.Label>아이디</Field.Label>
            <Input name="name" />
          </Field.Root>

          <Field.Root>
            <Field.Label>비밀번호</Field.Label>
            <Input name="password" type="password" />
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
  );
};

export default Signup;
