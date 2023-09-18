import { LinkButton } from "../../../components";

export function HeaderHome() {
  return (
    <div className="header">
      <div className="welcome">
        <h1>Clientes</h1>
        <p>Bem vindo ao sistema de cadastro de clientes</p>
      </div>
      <div className="action">
        <LinkButton to="form">Adicionar novo</LinkButton>
      </div>
    </div>
  );
}
