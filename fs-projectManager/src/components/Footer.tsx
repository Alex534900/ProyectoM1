type FooterProps = {
  total: number;
  completed: number;
  pending: number;
  onLogout?: () => void; // 👈 nueva prop para logout
};

function Footer(props: FooterProps) {
  return (
    <footer style={{ marginTop: "20px" }}>
      <p>Total de tareas: {props.total}</p>
      <p>Completadas: {props.completed}</p>
      <p>Pendientes: {props.pending}</p>

      {/* 👇 Botón de logout */}
      {props.onLogout && (
        <button onClick={props.onLogout} className="logout-button">
            Cerrar Sesion
        </button>
      )}
    </footer>
  );
}

export default Footer;
