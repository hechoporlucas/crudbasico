import React, { useState, useEffect } from "react";
import "./App.css";
import "./bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inicio from "./Components/Principal/Inicio.js";
import Editar from "./Components/Products/Editar.js";
import AgregarProducto from "./Components/Products/AgregarProducto.js";
import ListaProducto from "./Components/Products/ListaProducto.js";
import Header from "./Components/Common/Header";
import Footer from "./Components/Common/Footer";
import Swal from "sweetalert2";
import Error404 from './Components/Common/Error404';

function App() {
  //definimos los states de productos..
  const [productos, setProductos] = useState([]);
  const [recargarProducto, setRecargarProducto] = useState(true);

  useEffect(() => {
    if (recargarProducto) {
      consultaAPI();
      setRecargarProducto(false);
    }
  }, [recargarProducto]);

  const consultaAPI = async () => {
    try {
      //obtener lista de productos...
      const consulta = await fetch("http://localhost:4000/cafeteria");
      console.log(consulta);
      const respuesta = await consulta.json();
      console.log(respuesta);
      if ((await consulta.status) !== 200) {
        Swal.fire({
          icon: "error",
          title: "Ha ocurrido un error!",
          text: "El producto no ha sido agregado correctamente",
        });
      }
      //guardar en el state
      setProductos(respuesta);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/">
          <Inicio></Inicio>
        </Route>
        <Route exact path="/productos">
          <ListaProducto
            productos={productos}
            setRecargarProductos={setRecargarProducto}
          ></ListaProducto>
        </Route>
        <Route exact path="/productos/nuevo">
          <AgregarProducto
            setRecargarProductos={setRecargarProducto}
          ></AgregarProducto>
        </Route>
        <Route
          exact
          path="/productos/editar/:id"
          render={(props) => {
            //codigo a ejecutar antes de renderizar el componente...
            //obtener el ID de la ruta
            const idProducto = parseInt(props.match.params.id);
            //console.log(idProducto);
            //buscar el producto que coincida con el ID...
            const productoSeleccionado = productos.find(itemProducto => itemProducto.id === idProducto);
            console.log(productoSeleccionado);
            //mostrar el componente <Editar/>;
            return <Editar producto={productoSeleccionado} setRecargarProducto={setRecargarProducto}></Editar>;
          }}
        ></Route>
        <Route exact path='*'>
          <Error404></Error404>
        </Route>
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
