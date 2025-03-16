import React from "react";

export default function AgendaApp() 
{
  const [Contactos, setContacto] = React.useState([]);
  const [Ncontacto, setNewContacto] = React.useState({ nombre: "", apellido: "", telefono: "" });

  React.useEffect(
  () => 
    {
    fetchContacts();
    }, 
  []
);




  const fetchContacts = async () => 
    {
    try 
    {
      let repositorio = await fetch("http://www.raydelto.org/agenda.php");
      const Data = await repositorio.json();
      setContacto(Data);
    } 
    catch (error) 
    {
      console.error("Error", error);
    }
  };

  const addContact = async () => 
    {
    if (!(Ncontacto.nombre || Ncontacto.apellido || Ncontacto.telefono)) 
    {
      alert("llena todos los campos!!!");
      return;
    }

    try 
    {
      await fetch("http://www.raydelto.org/agenda.php", 
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(Ncontacto),
      });
      setNewContacto({ nombre: "", apellido: "", telefono: "" });
      fetchContacts();
    } 
    catch (error) 
    {
      console.error("Error adding contact:", error);
    }
  };

  
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Agenda de Contactos</h1>
      <div className="space-y-2 mb-4">
        <input
          placeholder="Nombre"
          value={Ncontacto.nombre}
          onChange={(e) => setNewContacto({ ...Ncontacto, nombre: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          placeholder="Apellido"
          value={Ncontacto.apellido}
          onChange={(e) => setNewContacto({ ...Ncontacto, apellido: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          placeholder="Teléfono"
          value={Ncontacto.telefono}
          onChange={(e) => setNewContacto({ ...Ncontacto, telefono: e.target.value })}
          className="border p-2 w-full"
        />
        <button onClick={addContact} className="bg-blue-500 text-white p-2 rounded">Agregar Contacto</button>
      </div>
      <h2 className="text-lg font-semibold mb-2">Lista de Contactos</h2>
      <div className="space-y-2">
        {Contactos.map((contact, index) => (
          <div key={index} className="border p-2 rounded">
            {contact.nombre} {contact.apellido} - {contact.telefono}
          </div>
        ))}
      </div>
    </div>
  );
}

