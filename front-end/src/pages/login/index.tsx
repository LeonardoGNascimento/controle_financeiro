import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "../../componets/input";
import { Submit } from "../../componets/submit";
import { useLogin } from "./hook/useLogin";
import {
  BotaoLogin,
  ContainerBotaoLogar,
  Div,
  Image,
  LoginContainer,
  LoginModal,
  Titulo,
} from "./style";
import { ILogin, schema } from "./yup/schema";
import teste from "../../assets/img/login.jpg";

export function Login() {
  const { logar, loading } = useLogin();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver(schema),
  });

  async function handleLogin({ email, senha }: ILogin) {
    const { data, hasErro } = await logar(email, senha);

    if (hasErro) {
      return toast.error(data.message);
    }

    localStorage.setItem("@token", data.access_token);
    localStorage.setItem("@email", email);
    localStorage.setItem("@nome", data.nome);
    navigate("/home");
  }

  return (
    <LoginContainer>
      <LoginModal>
        <Row>
          <Col>
            <Image src={teste} />
          </Col>
          <Col>
            <Div>
              <div>
                <Titulo>UTI do Celular</Titulo>
                <Form onSubmit={handleSubmit(handleLogin)}>
                  <Form.Group controlId="email">
                    <Input error={errors.email?.message}>
                      <Form.Control
                        type="email"
                        placeholder="Insira seu e-mail"
                        {...register("email")}
                      />
                    </Input>
                  </Form.Group>
                  <Form.Group controlId="senha">
                    <Input error={errors.senha?.message}>
                      <Form.Control
                        type="password"
                        placeholder="Insira sua senha"
                        {...register("senha")}
                      />
                    </Input>
                  </Form.Group>
                  <ContainerBotaoLogar>
                    <Submit loading={loading}>
                      <BotaoLogin type="submit">Entrar</BotaoLogin>
                    </Submit>
                  </ContainerBotaoLogar>
                </Form>
              </div>
            </Div>
          </Col>
        </Row>
      </LoginModal>
    </LoginContainer>
  );
}
