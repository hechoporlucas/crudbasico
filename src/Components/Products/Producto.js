import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";


const Producto = (props) => {
    const eliminarProducto = (id) =>{   
        Swal.fire({
            title: '¿Estas seguro que quieres eliminar el producto?',
            text: "No es posible revertir los cambios!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar el producto.',
            cancelButtonText: 'Cancelar'
          }).then( async (result) => {
            if (result.value) {
                //aca tenemos que borrar el producto...
                try{

                    const resultado = await fetch(`http://localhost:4000/cafeteria/${id}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": 'application/json'
                        }
                    });
                    if(resultado.status === 200){
                        props.setRecargarProductos(true);
                        Swal.fire(
                          'Eliminado!',
                          'El producto ha sido eliminado correctamente.',
                          'success'
                        )

                    }
                }catch(error){
                    console.log(error);
                    Swal.fire({
                        icon: "error",
                        title: "Ha ocurrido un error!",
                        text: "El producto no ha sido eliminado correctamente",
                      });
                }
            }
          })
    }; 

  return (
    <ListGroup.Item className="d-flex justify-content-between">
      <p>
        {props.producto.nombreProducto} -{" "}
        <span className="font-weight-bold">
          {props.producto.precioProducto}$
        </span>
      </p>
      <div>
        <Button variant={"danger"} className="mx-3 rounded-pill">
          Editar
        </Button>
        <Button
          variant={"warning"}
          className="mx-3 rounded-pill"
          type="button"
          onClick={() => eliminarProducto(props.producto.id)}
        >
          Eliminar
        </Button>
      </div>
    </ListGroup.Item>
  );
};

export default Producto;
