import { ArrowDown } from "react-feather";
import { mask } from "remask";
import { Customer } from "../type";
import { Fragment } from "react";

interface TableHomeProps {
  list: Customer[];
  selectRow: (id: string, observations: string) => void;
  clicked: {
    id: string;
    observation: string;
  };
  loading: boolean;
}

export function TableHome({
  list,
  clicked,
  selectRow,
  loading,
}: TableHomeProps) {
  if (loading) {
    return (
      <div className="table">
        <p>Carregando...</p>
      </div>
    );
  }
  return (
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
            <Fragment key={item.id}>
              <tr onClick={() => selectRow(item.id, item.observation)}>
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
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
