import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Swal from "sweetalert2";
import  {withRouter} from 'react-router-dom';

const Editar = (props) => {
  //genero los useRef:
  const nombreProductoRef = useRef("");
  const precioProductoRef = useRef("");
  ///////////////////////////
  const [categoria, setCategoria] = useState("");
  const [error, setError] = useState(false);
  ///////////////////////////
  const seleccionarCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validar los datos
    const _categoria = categoria === "" ? props.producto.categoria : categoria;
    //console.log(_categoria);
    //console.log(nombreProductoRef.current.value);
    //console.log(precioProductoRef.current.value);
    if (
      nombreProductoRef.current.value.trim() === "" ||
      _categoria === "" ||
      precioProductoRef.current.value.trim() === ""
    ) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    //preparar el envio de datos
    const productoEditado = {
      nombreProducto: nombreProductoRef.current.value,
      precioProducto: precioProductoRef.current.value,
      categoria: _categoria,
    };
    //envio los cambios a la api
    try {
      const respuesta = await fetch(`http://localhost:4000/cafeteria/${props.producto.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productoEditado)
      });
      console.log(respuesta);
      if(respuesta.status === 200){
        //quiere decir q si se modifico.
        props.setRecargarProducto(true);
        Swal.fire(
          "Producto Editado!",
          "El producto se edito correctamente.",
          "success"
        );
        props.history.push('/productos');
      }
    } catch{
      Swal.fire({
        icon: "error",
        title: "Ha ocurrido un error!",
        text: "El producto no ha sido agregado correctamente",
      });
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-5">Editar Producto</h1>
      {error ? ( //si el state error es verdadero
        <Alert variant={"danger"}>Todos los campos son obligatorios</Alert>
      ) : null}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nombre de producto</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Cafe con leche"
            ref={nombreProductoRef}
            defaultValue={props.producto.nombreProducto}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Precio *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: $50"
            ref={precioProductoRef}
            defaultValue={props.producto.precioProducto}
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
            defaultChecked={props.producto.categoria === "bebida-caliente"}
          />
          <Form.Check
            type="radio"
            label="Bebida fria"
            name="categoria"
            value="bebida-fria"
            onChange={seleccionarCategoria}
            defaultChecked={props.producto.categoria === "bebida-fria"}
          />
          <Form.Check
            type="radio"
            label="Sandwich"
            name="categoria"
            value="sandwich"
            onChange={seleccionarCategoria}
            defaultChecked={props.producto.categoria === "sandwich"}
          />
          <Form.Check
            type="radio"
            label="Dulce"
            name="categoria"
            value="dulce"
            onChange={seleccionarCategoria}
            defaultChecked={props.producto.categoria === "dulce"}
          />
          <Form.Check
            type="radio"
            label="Salado"
            name="categoria"
            value="salado"
            onChange={seleccionarCategoria}
            defaultChecked={props.producto.categoria === "salado"}
          />
        </Form.Group>
        <Button className="w-100 my-5" type="submit">
          Editar Producto
        </Button>
      </Form>
    </div>
  );
};

export default withRouter(Editar);
