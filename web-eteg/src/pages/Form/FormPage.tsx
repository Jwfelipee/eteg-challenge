import { useState } from "react";
import { BoxInput, Button } from "../../components";
import { mask } from "remask";
import "./FormPage.style.css";
import { validateCPF } from "../../helpers";
import { useNavigate } from "react-router-dom";
import { http } from "../../infra";
import { toast } from "react-toastify";
import { IFormPage } from "./type";

export function FormPage() {
  const [form, setForm] = useState<IFormPage>({
    name: "",
    email: "",
    cpf: "",
    color: "",
    observation: "",
  });
  const [error, setError] = useState<IFormPage>({
    name: "",
    email: "",
    cpf: "",
    color: "",
    observation: "",
  });
  const navigate = useNavigate();

  const handleChange = ({
    target,
  }: Pick<React.ChangeEvent<HTMLInputElement>, "target">) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
    if (error[name as keyof typeof error]) setError({ ...error, [name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;

    const { data, status } = await http.post("/customer", form);
    if (status === 201) {
      toast.success(
        `Cliente ${form.name.split(" ")[0]} cadastrado com sucesso!`
      );
      const FIVE_SECONDS = 5000;
      setTimeout(() => {
        navigate("/");
      }, FIVE_SECONDS);
      return;
    }

    toast.error(data.error);
  };

  const validateForm = () => {
    const { name, email, cpf, color } = form;
    const error: any = {};
    if (!name) error.name = "Campo obrigatório";
    if (!email) error.email = "Campo obrigatório";
    if (!cpf) error.cpf = "Campo obrigatório";
    if (!color) error.color = "Campo obrigatório";
    if (!validateCPF(cpf)) error.cpf = "CPF inválido";
    setError(error);
    return Object.keys(error).length === 0;
  };

  const cancel = () => navigate("/");

  return (
    <div className="formpage">
      <form onSubmit={handleSubmit} className="container container-form">
        <h1>
          Novo Cliente {form.name ? `- ${form.name?.split(" ")[0]}` : null}
        </h1>
        <div className="inputs-group">
          <BoxInput
            onChange={(e) => handleChange(e)}
            name="name"
            value={form.name}
            placeholder="Digite o seu nome"
            label="Nome completo"
            errorMessage={error.name}
            autoFocus
          />
          <BoxInput
            onChange={(e) => handleChange(e)}
            name="email"
            value={form.email}
            errorMessage={error.email}
            placeholder="Digite o seu e-mail"
            label="E-mail"
          />
          <BoxInput
            onChange={(e) => handleChange(e)}
            name="cpf"
            value={mask(form.cpf, ["999.999.999-99"])}
            errorMessage={error.cpf}
            placeholder="XXX.XXX.XXX-XX"
            label="CPF"
          />
          <BoxInput
            onChange={(e) => handleChange(e)}
            name="color"
            value={form.color}
            errorMessage={error.color}
            type="color"
            label="Selecione sua cor favorita"
          />
          <BoxInput
            onChange={(e) => handleChange(e)}
            placeholder="Se tiver observações, escreva elas aqui"
            label="Observações"
            sizeWidth="100"
            sizes="large"
            name="observation"
            value={form.observation}
            errorMessage={error.observation}
          />
        </div>
        <div className="actions">
          <Button onClick={cancel}>Cancelar</Button>
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </div>
  );
}
