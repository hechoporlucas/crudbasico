import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Swal from "sweetalert2";
import {withRouter} from "react-router-dom"; //sirve para redireccionar

const AgregarProducto = (props) => {
  const [nombreProducto, setNombre] = useState("");
  const [precioProducto, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [error, setError] = useState(false); //false no lo muestra

  const seleccionarCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validar datos...
    if (
      nombreProducto.trim() === "" ||
      precioProducto.trim() === "" ||
      categoria === ""
    ) {
      //mostrar al usuario un cartel de error
      setError(true);
      return;
    }
    setError(false);
    //enviar producto a la api.

    //construir un objeto con los datos a enviar:
    const datos = {
      //si el nombre de la propiedad es igual al del state, podemos escribir asi el objeto:
      nombreProducto, //nombreProducto: nombreProducto,
      precioProducto,
      categoria,
    };

    try {
      const cabecera = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      };

      const resultado = await fetch(
        "http://localhost:4000/cafeteria",
        cabecera
      );
      console.log(resultado);
      //si la operacion fue exitosa, quiero mostrar un cartel...
      if (resultado.status === 201) {
        Swal.fire(
          "Producto agregado!",
          "El producto se agrego correctamente.",
          "success"
        );
        //actualizar nuestra lista de productos...
        props.setRecargarProductos(true);
        //redireccionar a alguna pagina (lista productos en este caso)...
        props.history.push('/productos');
      } else {
        Swal.fire({
          icon: "error",
          title: "Ha ocurrido un error!",
          text: "El producto no ha sido agregado correctamente",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-5">Agregar Nuevo Producto</h1>
      {error ? ( //si el state error es verdadero
        <Alert variant={"danger"}>Todos los campos son obligatorios</Alert>
      ) : null}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nombre de producto *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Cafe con leche"
            onChange={(e) => {
              setNombre(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Precio *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: $50"
            onChange={(e) => {
              setPrecio(e.target.value);
            }}
          />
        </Form.Group>
        <h2 className="text-center my-5">Categoria</h2>
        <Form.Group className="container d-flex justify-content-around">
          <Form.Check
            type="radio"
            label="Bebida caliente"
            name="categoria"
            value="bebida-caliente"
            onChange={seleccionarCategoria}
          />
          <Form.Check
            type="radio"
            label="Bebida fria"
            name="categoria"
            value="bebida-fria"
            onChange={seleccionarCategoria}
          />
          <Form.Check
            type="radio"
            label="Sandwich"
            name="categoria"
            value="sandwich"
            onChange={seleccionarCategoria}
          />
          <Form.Check
            type="radio"
            label="Dulce"
            name="categoria"
            value="dulce"
            onChange={seleccionarCategoria}
          />
          <Form.Check
            type="radio"
            label="Salado"
            name="categoria"
            value="salado"
            onChange={seleccionarCategoria}
          />
        </Form.Group>
        <Button className="btn-block my-5" type="submit">
          Agregar producto
        </Button>
      </Form>
    </div>
  );
};

export default withRouter(AgregarProducto);
