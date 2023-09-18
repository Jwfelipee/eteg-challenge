import { useEffect, useState } from "react";
import "./HomePage.style.css";
import { http } from "../../infra";
import { HeaderHome, TableHome } from "./components";
import { Customer } from "./type";

export function HomePage() {
  const [list, setList] = useState<Customer[]>([]);
  const [clicked, setClicked] = useState({
    id: "",
    observation: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    setLoading(true);
    const { data, status } = await http.get("/customer");
    if (status === 200) {
      setList(data);
    }
    setLoading(false);
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
        <HeaderHome />
        <TableHome
          selectRow={selectRow}
          clicked={clicked}
          list={list}
          loading={loading}
        />
      </div>
    </div>
  );
}
