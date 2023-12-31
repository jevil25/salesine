import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { Stepper } from "@mantine/core";

export default function AuthenticationTitle() {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) =>
      current > 0 && localStorage.getItem("token") == undefined
        ? current - 1
        : current
    );
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [inactive, setInactive] = useState(false);
  const BACK_END_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
  const loginHandler = async () => {
    fetch(`${BACK_END_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, remember }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Method not allowed") {
          console.log("Method not allowed");
          setServerError(true);
          return;
        }
        else if (data.message === "Invalid credentials") {
          setInvalid(true);
          return;
        }else if (data.message === "Company is inactive") {
          setInactive(true);
          return;
        }
        if (data.user.token) {
          localStorage.setItem("token", data.user.token);
          localStorage.setItem("email", data.user.email);
          localStorage.setItem("role", data.user.role);
          if(data.message === "Company is inactive"){
              setInactive(true);
          }
          else if (
            data.message ===
            "Voice rec ,password change and google calendar integration needed"
          ) {
            router.push({
              pathname: "/advance_register",
              query: { id: "0" },
            });
          } else if (
            data.message === "Google calendar and password change needed"
          ) {
            router.push({
              pathname: "/advance_register",
              query: { id: "1" },
            });
          } else if (
            data.message === "Google calendar and voice registration needed"
          ) {
            router.push({
              pathname: "/advance_register",
              query: { id: "2" },
            });
          } else if (
            data.message === "Password change and voice registration needed"
          ) {
            router.push({
              pathname: "/advance_register",
              query: { id: "3" },
            });
          } else if (data.message === "Password change needed") {
            router.push({
              pathname: "/advance_register",
              query: { id: "4" },
            });
          } else if (data.message === "Voice rec needed") {
            router.push({
              pathname: "/advance_register",
              query: { id: "5" },
            });
          }
          else if (data.message === "Google calendar needed") {
            router.push({
              pathname: "/advance_register",
              query: { id: "6" },
            });
          } else {
            router.push("/");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container size={800} my={80}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Salesine | Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component="button">
          <Link href="/register">Create account</Link>
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {invalid && (
          <Text color="red" align="center">
            Invalid credentials
          </Text>
        )}
        {serverError && (
          <Text color="red" align="center">
            Server error
          </Text>
        )}
        {inactive && (
          <Text color="red" align="center">
            Company is inactive. Please wait till its active or contact the super admin.
          </Text>
        )}
        <TextInput
          label="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@mantine.dev"
          size="md"
          required
        />
        <PasswordInput
          label="Password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          size="md"
          required
          mt="md"
        />
        <br />
        <Checkbox
          label="Keep me logged in"
          name="keep-logged-in"
          onChange={(e) => setRemember(e.target.checked)}
        />
        <Group position="apart" mt="lg">
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button
          fullWidth
          mt="xl"
          size="md"
          onClick={loginHandler}
          color="indigo"
        >
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
