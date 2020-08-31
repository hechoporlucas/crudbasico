import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Editar = () => {
  return (
    <div className="container">
      <h1 className="text-center my-5">Editar Producto</h1>
      <Form>
        <Form.Group>
          <Form.Label>Nombre de producto</Form.Label>
          <Form.Control type="text" placeholder="Ej: Cafe con leche" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Precio *</Form.Label>
          <Form.Control type="text" placeholder="Ej: $50" />
        </Form.Group>
        <h2 className="text-center my-5">Categoria</h2>
        <Form.Group className="container d-flex justify-content-around">
          <Form.Check
            type="radio"
            label="Bebida caliente"
            name="categoria"
            value="bebida-caliente"
          />
          <Form.Check
            type="radio"
            label="Bebida fria"
            name="categoria"
            value="bebida-fria"
          />
          <Form.Check
            type="radio"
            label="Sandwich"
            name="categoria"
            value="sandwich"
          />
          <Form.Check
            type="radio"
            label="Dulce"
            name="categoria"
            value="dulce"
          />
          <Form.Check
            type="radio"
            label="Salado"
            name="categoria"
            value="salado"
          />
        </Form.Group>
      </Form>
      <Button className="w-100 my-5">Editar Producto</Button>
    </div>
  );
};

export default Editar;
