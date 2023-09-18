import { useEffect, useState } from "react";
import { LinkButton } from "../../components";
import "./HomePage.style.css";
import { http } from "../../infra";
import { mask } from "remask";
import { ArrowDown } from "react-feather";

export function HomePage() {
  const [list, setList] = useState<Customer[]>([]);
  const [clicked, setClicked] = useState({
    id: "",
    observation: "",
  });

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    const { data, status } = await http.get("/customer");
    if (status === 200) {
      setList(data);
    }
    console.log(data);
  };

  const selectRow = (id: string, observations: string) => {
    if (clicked.id === id || !observations) {
      setClicked({
        id: "",
        observation: "",
      });
      return;
    }
    setClicked({
      id,
      observation: observations,
    });
  };

  return (
    <div className="homepage">
      <div className="container container-home">
        <div className="header">
          <div className="welcome">
            <h1>Clientes</h1>
            <p>Bem vindo ao sistema de cadastro de clientes</p>
          </div>
          <div className="action">
            <LinkButton to="form">Adicionar novo</LinkButton>
          </div>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>CPF</th>
                <th>Cor Favorita</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <>
                  <tr
                    key={item.id}
                    onClick={() => selectRow(item.id, item.observation)}
                  >
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{mask(item.cpf, ["999.999.999-99"])}</td>
                    <td>
                      <div className="details">
                        <div
                          className="color"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        {item.observation ? (
                          <button
                            className={`arrow-action ${
                              clicked.id === item.id && "arrow-action-active"
                            }`}
                          >
                            <ArrowDown size={16} />
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                  {clicked.id === item.id && (
                    <tr className="observations">
                      <td colSpan={4}>
                        <p>Observação: {clicked.observation}</p>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

interface Customer {
  id: string;
  name: string;
  email: string;
  cpf: string;
  color: string;
  observation: string;
}
