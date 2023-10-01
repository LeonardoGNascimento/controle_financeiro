import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loginImg from "../../assets/img/login.jpg";
import { Input } from "../../componets/input";
import { Submit } from "../../componets/submit";
import { Container } from "./components/container";
import { useLogin } from "./hook/useLogin";
import { ILogin, schema } from "./yup/schema";
import { Usuario } from "../../_service/localStore/localStore";

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

    Usuario.setId(data.id);
    Usuario.setToken(data.access_token);
    Usuario.setNome(data.nome);

    navigate("/home");
  }

  return (
    <Container>
      <div>
        <img className="w-full rounded-l-lg" src={loginImg} />
      </div>
      <div className="bg-gray-400 p-8 rounded-r -lg">
        <h1 className="flex justify-center mb-12 text-white">Legana Tech</h1>
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
          <div className="flex justify-center">
            <Submit loading={loading}>
              <Button type="submit">Entrar</Button>
            </Submit>
          </div>
        </Form>
      </div>
    </Container>
  );
}
