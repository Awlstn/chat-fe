import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    Button,
    Field,
    Fieldset,
    Heading,
    Input,
    Flex,
    Text,
} from "@chakra-ui/react";
import { postLogin } from "../api/postLogin";
import socket from "@/app/socket";

const Login = () => {
    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await postLogin({ userId, password });
            if (res.status === 200) {
                localStorage.setItem("token", res.data.token); // 로컬스토리지에 토큰 저장
                socket.connect(); // 로그인 성공 후 소켓 연결
                const token = localStorage.getItem("token");
                socket.emit("login", token);
                navigate(`/${res.data.id}`);
            } else {
                alert("로그인 실패");
            }
        } catch (error) {
            console.error("로그인 중 에러 발생:", error);
            alert("로그인 요청 중 문제가 발생했습니다.");
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <Flex minH="100vh" align="center" justify="center">
                <Fieldset.Root size="lg" maxW="md">
                    <Flex justify="center">
                        <Heading size="4xl">Chat</Heading>
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
                    </Fieldset.Content>

                    <Button
                        type="submit"
                        w="full"
                        alignSelf="flex-start"
                        backgroundColor="black"
                    >
                        로그인
                    </Button>
                    <Flex justify="center">
                        <Link to="/signup">
                            <Text>회원가입</Text>
                        </Link>
                    </Flex>
                </Fieldset.Root>
            </Flex>
        </form>
    );
};
export default Login;

/**
 * 사용 컴포넌트 및 주요 props 정리
 *
 * Flex
 *  - 레이아웃용 flexbox 컨테이너
 *  - 주요 props:
 *    - minH="100vh": 전체 화면 높이 지정
 *    - align="center": 교차축(수평) 가운데 정렬
 *    - justify="center": 주축(수직) 가운데 정렬
 *    - direction="column" (없으면 기본 row)
 *
 * Fieldset.Root
 *  - 입력 폼 그룹 컨테이너
 *  - 주요 props:
 *    - size="lg": 크기 조절 (패딩, 폰트 등)
 *    - maxW="md": 최대 너비 제한
 *
 * Heading
 *  - 제목 텍스트
 *  - 주요 props:
 *    - size="4xl": 텍스트 크기 설정
 *
 * Fieldset.Content
 *  - Fieldset 내 입력 필드 감싸는 영역
 *
 * Field.Root
 *  - 개별 입력 필드 그룹 컨테이너
 *
 * Field.Label
 *  - 입력 필드 라벨 텍스트
 *
 * Input
 *  - 텍스트 입력 필드
 *  - 주요 props:
 *    - name: 폼 데이터 식별자
 *    - type: 입력 타입 (예: "email", "password")
 *
 * Button
 *  - 클릭 가능한 버튼
 *  - 주요 props:
 *    - type="submit": 폼 제출 버튼 지정
 *    - w="full": 부모 너비 100% 차지
 *    - alignSelf="flex-start": 부모 flex 내 왼쪽 정렬
 *    - backgroundColor="black": 배경색 지정
 *    - color="white": 글자색 지정
 *
 * Text
 *  - 일반 텍스트 표시용 컴포넌트
 *
 * Flex (중복)
 *  - 회원가입 텍스트 감싸고 가로 중앙 정렬
 *  - 주요 props:
 *    - justify="center": 가로 중앙 정렬
 */
