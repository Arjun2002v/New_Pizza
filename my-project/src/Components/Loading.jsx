export const Loading = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f9f9f9",
    }}
  >
    <div
      style={{
        width: "50px",
        height: "50px",
        border: "5px solid #f3f3f3",
        borderRadius: "50%",
        borderTop: "5px solid #3498db",
        animation: "spin 1s linear infinite",
      }}
    ></div>
  </div>
);

// CSS for Spinner
const styles = document.createElement("style");
styles.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
document.head.appendChild(styles);
